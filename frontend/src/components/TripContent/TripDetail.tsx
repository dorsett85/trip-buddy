import React, { useState, useEffect } from 'react';
import { DispatchProp } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popper from '@material-ui/core/Popper';
import Card from '@material-ui/core/Card';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import PinDropIcon from '@material-ui/icons/PinDrop';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { DateTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import styled, { css } from 'styled-components';
import { Trip, tripStatus } from '../../types/trip';
import EditableTextField from '../generic/EditableTextField/EditableTextField';
import {
  UPDATING_MESSAGE,
  SUCCESSFUL_UPDATE_MESSAGE
} from '../../utils/constants/messages';
import { updateTrip, deleteTrip, setActiveTripInfo } from '../../store/trip/actions';
import { getFirstError } from '../../utils/apolloErrors';
import TripItineraries from './TripItineraries';
import { setDrawer, setFlyTo } from '../../store/general/actions';
import { Feature } from '../../types/apiResponses';
import { AppAction } from '../../store/types';
import { MapboxService } from '../../api/mapbox/MapBoxService';
import { debounce } from '../../utils/debouce';
import { DELETE_TRIP, UPDATE_TRIP } from '../ApolloProvider/gql/trip';
import { useAppSelector } from '../../store/hooks/useAppSelector';

export interface TripDetailProps extends DispatchProp<AppAction> {
  trip: Trip;
}

const Header = styled.div(
  ({ theme }) => css`
  div:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  div:nth-of-type(2) {
    margin-top: ${theme.spacing('xs')}
    color: red;
  }
`
);

const ElevatedPopper = styled(Popper)`
  z-index: 10000;
`;

const CircularProgressStyled = styled(CircularProgress)`
  position: absolute;
`;

const TripHeader: React.FC<TripDetailProps> = ({ dispatch, trip }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [deleteResponseText, setDeleteResponseText] = useState('');
  const [deleteTripMutation, { loading }] = useMutation(DELETE_TRIP, {
    onCompleted: data => {
      dispatch(setDrawer({ open: false }));
      dispatch(deleteTrip(data.deleteTrip));
    },
    onError: error => {
      setDeleteResponseText(getFirstError(error));
    }
  });

  const handleToggleDeletePopper = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleConfirmDeleteClick = () => {
    setAnchorEl(null);
    deleteTripMutation({ variables: { id: trip.id } });
  };

  const popperId = anchorEl ? 'delete-popper' : undefined;

  return (
    <Header>
      <div>
        <h2>Trip Details</h2>
        <Fab
          color='secondary'
          variant={loading ? 'round' : 'extended'}
          onClick={handleToggleDeletePopper}
          aria-describedby={popperId}
          disabled={loading}
        >
          {loading ? (
            <CircularProgressStyled color='inherit' />
          ) : (
            <span>Delete &nbsp;</span>
          )}
          <DeleteIcon />
        </Fab>
        <ElevatedPopper id={popperId} open={!!anchorEl} anchorEl={anchorEl}>
          <Card style={{ width: '300px' }}>
            <ButtonGroup size='small' fullWidth>
              <Button color='secondary' onClick={handleConfirmDeleteClick}>
                Confirm Delete
              </Button>
              <Button color='primary' onClick={handleToggleDeletePopper}>
                Cancel
              </Button>
            </ButtonGroup>
          </Card>
        </ElevatedPopper>
      </div>
      {deleteResponseText && <div>{deleteResponseText}</div>}
    </Header>
  );
};

const TripNameInput: React.FC<TripDetailProps> = ({ dispatch, trip }) => {
  const [name, setName] = useState(trip.name);
  const [editingName, setEditingName] = useState(false);
  const [updateNameText, setUpdateNameText] = useState('');
  const [updateNameError, setUpdateNameError] = useState(false);

  const [updateTripQuery, { loading }] = useMutation(UPDATE_TRIP, {
    onCompleted: () => {
      setEditingName(false);
      setUpdateNameError(false);
      dispatch(updateTrip({ id: trip.id, name }));
      setUpdateNameText(SUCCESSFUL_UPDATE_MESSAGE);
    },
    onError: error => {
      setUpdateNameError(true);
      setUpdateNameText(getFirstError(error));
    }
  });

  const handleNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setEditingName(true);
    setName(target.value);
  };

  const handleSubmitName = () => {
    setUpdateNameError(false);
    setUpdateNameText('');
    if (name.length >= 4) {
      updateTripQuery({ variables: { input: { id: trip.id, name } } });
    } else {
      setUpdateNameError(true);
      setUpdateNameText('Trip name must be at least 4 characters');
    }
  };

  const handleCancelName = () => {
    if (name !== trip.name) {
      setName(trip.name);
    }
    setEditingName(false);
    setUpdateNameError(false);
    setUpdateNameText('');
  };

  return (
    <EditableTextField
      label='Name'
      value={name}
      editing={editingName}
      onChange={handleNameChange}
      onSubmitEdit={handleSubmitName}
      onCancelEdit={handleCancelName}
      helperText={loading ? UPDATING_MESSAGE : updateNameText}
      error={updateNameError}
      fullWidth
      margin='normal'
    />
  );
};

const TripDescriptionInput: React.FC<TripDetailProps> = ({ dispatch, trip }) => {
  const [description, setDescription] = useState(trip.description);
  const [editingDescription, setEditingDescription] = useState(false);
  const [updateDescriptionText, setUpdateDescriptionText] = useState('');
  const [updateDescriptionError, setUpdateDescriptionError] = useState(false);

  const [updateTripQuery, { loading }] = useMutation(UPDATE_TRIP, {
    onCompleted: () => {
      setEditingDescription(false);
      setUpdateDescriptionError(false);
      dispatch(updateTrip({ ...trip, description }));
      setUpdateDescriptionText(SUCCESSFUL_UPDATE_MESSAGE);
    },
    onError: error => {
      setUpdateDescriptionError(true);
      setUpdateDescriptionText(getFirstError(error));
    }
  });

  const handleDescriptionChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setEditingDescription(true);
    setDescription(target.value);
  };

  const handleSubmitDescription = () => {
    setUpdateDescriptionError(false);
    setUpdateDescriptionText('');
    updateTripQuery({ variables: { input: { id: trip.id, description } } });
  };

  const handleCancelDescription = () => {
    if (description !== trip.description) {
      setDescription(trip.description);
    }
    setEditingDescription(false);
    setUpdateDescriptionError(false);
    setUpdateDescriptionText('');
  };

  return (
    <EditableTextField
      label='Description'
      value={description || ''}
      type='textarea'
      multiline
      rows={2}
      rowsMax={10}
      variant='filled'
      editing={editingDescription}
      onChange={handleDescriptionChange}
      onSubmitEdit={handleSubmitDescription}
      onCancelEdit={handleCancelDescription}
      helperText={loading ? UPDATING_MESSAGE : updateDescriptionText}
      error={updateDescriptionError}
      fullWidth
      margin='normal'
    />
  );
};

const DEFAUL_NO_OPTIONS_TEXT = 'Enter at least four characters...';
const DEFAULT_UPDATE_LOCATION_TEXT = 'Click an option from the dropdown list to update';

const TripLocationInput: React.FC<TripDetailProps> = ({ dispatch, trip }) => {
  const [location, setLocation] = useState(trip.location_address);
  const [locationOptions, setLocationOptions] = useState<Feature[]>();
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [noOptionsText, setNoOptionsText] = useState(DEFAUL_NO_OPTIONS_TEXT);
  const [updateLocationText, setUpdateLocationText] = useState(
    DEFAULT_UPDATE_LOCATION_TEXT
  );
  const newLocation = useAppSelector(
    state =>
      state.trip.activeTripInfo && state.trip.activeTripInfo.newLocation
  );
  const [updateLocationError, setUpdateLocationError] = useState(false);

  const [updateLocationMutation, { loading }] = useMutation(UPDATE_TRIP, {
    onCompleted: data => {
      setUpdateLocationError(false);
      setUpdateLocationText(SUCCESSFUL_UPDATE_MESSAGE);
      dispatch(
        updateTrip({
          id: trip.id,
          location: data.updateTrip.location,
          location_address: data.updateTrip.location_address
        })
      );

      // Clean up the active trip state and fly to the new location
      dispatch(setActiveTripInfo({ newLocation: undefined, updatingLocation: false }));
      dispatch(setFlyTo(data.updateTrip.location));
    },
    onError: error => {
      setUpdateLocationError(true);
      setUpdateLocationText(getFirstError(error));
    }
  });

  // Listener for updating the trip location. This will fire after a location
  // is selected on the map and the newLocation lng/lat is set
  useEffect(() => {
    if (newLocation) {
      const lngLatString = newLocation.toString();
      MapboxService.getGeocodeFeatureCollection(lngLatString).then(featureCollection => {
        const { features } = featureCollection;
        const locationText = features.length ? features[0].place_name : lngLatString;
        setLocation(locationText);
        updateLocationMutation({
          variables: {
            input: {
              id: trip.id,
              location: newLocation,
              location_address: locationText
            }
          }
        });
      });
    }
  }, [dispatch, newLocation, trip.id, updateLocationMutation]);

  const handleOnLocationChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateLocationError(false);
    setUpdateLocationText(DEFAULT_UPDATE_LOCATION_TEXT);
    setLocation(target.value);
    // Wait for the input to be a least 4 characters before search
    if (target.value.length <= 3) {
      setNoOptionsText(DEFAUL_NO_OPTIONS_TEXT);
      setLocationOptions(undefined);
    } else if (target.value.length > 3) {
      setNoOptionsText('No options');
      setLocationsLoading(true);
      debounce(() => {
        MapboxService.getGeocodeFeatureCollection(target.value).then(locations => {
          setLocationOptions(locations.features);
          setLocationsLoading(false);
        });
      }, 1000);
    }
  };

  const handleLocationSelect = ({ target }: React.ChangeEvent<any>) => {
    const optionIdx = target.getAttribute('data-option-index');
    if (locationOptions && optionIdx) {
      const { center } = locationOptions[optionIdx];
      const selectedLocation = locationOptions[optionIdx].place_name;
      setLocation(selectedLocation);
      updateLocationMutation({
        variables: {
          input: { id: trip.id, location: center, location_address: selectedLocation }
        }
      });
    } else {
      setLocation('');
    }
  };

  const handleDropLocationPinClick = () => {
    dispatch(setDrawer({ open: false }));
    dispatch(setActiveTripInfo({ activeMarker: `${trip.id}`, updatingLocation: true }));
  };

  return (
    <Autocomplete
      options={locationOptions}
      loading={locationsLoading}
      onChange={handleLocationSelect}
      noOptionsText={noOptionsText}
      getOptionLabel={(option: Feature) => option.place_name}
      renderInput={({ InputProps, InputLabelProps, ...rest }) => (
        <TextField
          {...rest}
          label='Start location'
          placeholder='Enter a location or drop a pin...'
          helperText={loading ? UPDATING_MESSAGE : updateLocationText}
          error={updateLocationError}
          onInput={handleOnLocationChange}
          inputProps={{
            ...rest.inputProps,
            value: location
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          InputProps={{
            ...InputProps,
            endAdornment: (
              <InputAdornment title='Drop pin' position='end'>
                <IconButton onClick={handleDropLocationPinClick}>
                  <PinDropIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          InputLabelProps={{ ...InputLabelProps, shrink: true }}
          variant='outlined'
          margin='normal'
          fullWidth
        />
      )}
    />
  );
};

const TripStartDateSelect: React.FC<TripDetailProps> = ({ dispatch, trip }) => {
  const [updateStartDateText, setUpdateStartDateText] = useState('');
  const [updateStartDateError, setUpdateStartDateError] = useState(false);

  const [updateTripQuery, { loading }] = useMutation(UPDATE_TRIP, {
    onCompleted: data => {
      setUpdateStartDateError(false);
      dispatch(updateTrip({ ...trip, start_date: data.updateTrip.start_date }));
      setUpdateStartDateText(SUCCESSFUL_UPDATE_MESSAGE);
    },
    onError: error => {
      setUpdateStartDateError(true);
      setUpdateStartDateText(getFirstError(error));
    }
  });

  const handleStartDateChange = (date: MaterialUiPickersDate) => {
    if (date) {
      updateTripQuery({
        variables: { input: { id: trip.id, start_date: date.toISOString() } }
      });
    }
  };

  return (
    <DateTimePicker
      label='Start Date'
      onChange={handleStartDateChange}
      helperText={loading ? UPDATING_MESSAGE : updateStartDateText}
      error={updateStartDateError}
      value={trip.start_date || null}
      margin='normal'
      fullWidth
    />
  );
};

const TripStatusSelect: React.FC<TripDetailProps> = ({ dispatch, trip }) => {
  const [updateStatusText, setUpdateStatusText] = useState('');
  const [updateStatusError, setUpdateStatusError] = useState(false);

  const [updateTripQuery, { loading }] = useMutation(UPDATE_TRIP, {
    onCompleted: data => {
      setUpdateStatusError(false);
      dispatch(updateTrip({ ...trip, status: data.updateTrip.status }));
      setUpdateStatusText(SUCCESSFUL_UPDATE_MESSAGE);
    },
    onError: error => {
      setUpdateStatusError(true);
      setUpdateStatusText(getFirstError(error));
    }
  });

  const handleStatusChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    updateTripQuery({ variables: { input: { id: trip.id, status: target.value } } });
  };

  return (
    <TextField
      select
      label='Status'
      value={trip.status}
      onChange={handleStatusChange}
      helperText={loading ? UPDATING_MESSAGE : updateStatusText}
      error={updateStatusError}
      fullWidth
      margin='normal'
    >
      {tripStatus.map(option => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

const TripDetail: React.FC<TripDetailProps> = ({ dispatch, trip }) => {
  return (
    <div>
      <TripHeader dispatch={dispatch} trip={trip} />
      <TripNameInput dispatch={dispatch} trip={trip} />
      <TripDescriptionInput dispatch={dispatch} trip={trip} />
      <TripStartDateSelect dispatch={dispatch} trip={trip} />
      <TripLocationInput dispatch={dispatch} trip={trip} />
      <TripStatusSelect dispatch={dispatch} trip={trip} />
      <TripItineraries dispatch={dispatch} tripId={trip.id} />
    </div>
  );
};

export default TripDetail;
