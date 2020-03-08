import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import Popper from '@material-ui/core/Popper';
import Card from '@material-ui/core/Card';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { DateTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import styled, { css } from 'styled-components';
import { DispatchProp } from 'react-redux';
import { TripRecord, tripStatus } from 'common/lib/types/trip';
import EditableTextField from '../generic/EditableTextField/EditableTextField';
import { UPDATING_MESSAGE } from '../../utils/constants/messages';
import {
  updateTrip,
  deleteTrip,
  setActiveTripInfo,
  setTripItineraries
} from '../../store/trip/reducer';
import { getFirstError } from '../../utils/apolloErrors';
import TripItineraries from './TripItineraries';
import { setDrawer, setFlyTo } from '../../store/general/reducer';
import { Feature } from '../../types/apiResponses';
import { MapboxService } from '../../api/mapbox/MapBoxService';
import { debounce } from '../../utils/debouce';
import { DELETE_TRIP, UPDATE_TRIP } from '../ApolloProvider/gql/trip';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import LocationInputAdornment from '../generic/LocationInputAdornment/LocationInputAdornment';
import SuccessText from '../AppText/SuccessText';
import ErrorText from '../AppText/ErrorText';
import FlyToButton from '../generic/FlyToButton';

export interface TripDetailProps extends DispatchProp {
  trip: TripRecord;
}

const ButtonStyled = styled(Button)(
  ({ theme }) => css`
    color: ${theme.colors.primary};
  `
);

const BackToTripsButton: React.FC<Omit<TripDetailProps, 'trip'>> = ({ dispatch }) => {
  const handleClick = () => {
    dispatch(setActiveTripInfo());
    dispatch(setTripItineraries());
  };

  return (
    <ButtonStyled onClick={handleClick} variant='text' size='small'>
      <ArrowBackIcon />
      &nbsp; View all trips
    </ButtonStyled>
  );
};

const InviteAutocompleteContainer = styled.div``;
const Header = styled.div(
  ({ theme }) => css`
    > div:nth-of-type(1) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div {
        display: flex;
        align-items: center;
        h2 {
          margin-right: ${theme.spacing('xs')};
        }
      }
    }
  `
);

const TripHeader: React.FC<TripDetailProps> = ({ dispatch, trip }) => {
  const [showInvite, setShowInvite] = useState(false);

  const handleShowInviteToggle = () => {
    setShowInvite(!showInvite);
  };

  const handleFlyToClick = () => {
    dispatch(setDrawer({ open: false }));
    dispatch(setFlyTo(trip.location));
    dispatch(setActiveTripInfo({ activeMarker: `${trip.id}` }));
  };

  return (
    <Header>
      <div>
        <div>
          <h2>Trip Details</h2>
          <div>
            <FlyToButton onClick={handleFlyToClick} />
          </div>
        </div>
        <Fab color='primary' variant='extended' onClick={handleShowInviteToggle}>
          <span>Invite &nbsp;</span>
          <PersonAddIcon />
        </Fab>
      </div>
      {showInvite && (
        <InviteAutocompleteContainer>
          <Autocomplete
            id='trip-invite-autocomplete'
            multiple
            filterSelectedOptions
            renderInput={inputProps => (
              <TextField
                {...inputProps}
                label='Enter invitee emails...'
                placeholder='Email...'
                variant='outlined'
                margin='normal'
                fullWidth
              />
            )}
          />
        </InviteAutocompleteContainer>
      )}
    </Header>
  );
};

const TripNameInput: React.FC<TripDetailProps> = ({ dispatch, trip }) => {
  const [name, setName] = useState(trip.name);
  const [editingName, setEditingName] = useState(false);
  const [updateNameText, setUpdateNameText] = useState<JSX.Element>();
  const [updateNameError, setUpdateNameError] = useState<JSX.Element>();

  const [updateTripQuery, { loading }] = useMutation(UPDATE_TRIP, {
    onCompleted: () => {
      setEditingName(false);
      dispatch(updateTrip({ id: trip.id, name }));
      setUpdateNameError(undefined);
      setUpdateNameText(<SuccessText />);
    },
    onError: error => {
      setUpdateNameError(<ErrorText text={getFirstError(error)} />);
    }
  });

  const handleNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setEditingName(true);
    setName(target.value);
  };

  const handleSubmitName = () => {
    setUpdateNameError(undefined);
    setUpdateNameText(undefined);
    if (name.length >= 4) {
      updateTripQuery({ variables: { input: { id: trip.id, name } } });
    } else {
      setUpdateNameError(<ErrorText text='Trip name must be at least 4 characters' />);
    }
  };

  const handleCancelName = () => {
    if (name !== trip.name) {
      setName(trip.name);
    }
    setEditingName(false);
    setUpdateNameError(undefined);
    setUpdateNameText(undefined);
  };

  const helperText =
    updateNameError || updateNameText || (loading && UPDATING_MESSAGE) || '';

  return (
    <EditableTextField
      label='Name'
      value={name}
      editing={editingName}
      onChange={handleNameChange}
      onSubmitEdit={handleSubmitName}
      onCancelEdit={handleCancelName}
      helperText={helperText}
      error={!!updateNameError}
      fullWidth
      margin='normal'
    />
  );
};

const TripDescriptionInput: React.FC<TripDetailProps> = ({ dispatch, trip }) => {
  const [description, setDescription] = useState(trip.description);
  const [editingDescription, setEditingDescription] = useState(false);
  const [updateDescriptionText, setUpdateDescriptionText] = useState<JSX.Element>();
  const [updateDescriptionError, setUpdateDescriptionError] = useState<JSX.Element>();

  const [updateTripQuery, { loading }] = useMutation(UPDATE_TRIP, {
    onCompleted: () => {
      setEditingDescription(false);
      dispatch(updateTrip({ ...trip, description }));
      setUpdateDescriptionError(undefined);
      setUpdateDescriptionText(<SuccessText />);
    },
    onError: error => {
      setUpdateDescriptionError(<ErrorText text={getFirstError(error)} />);
    }
  });

  const handleDescriptionChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setEditingDescription(true);
    setDescription(target.value);
  };

  const handleSubmitDescription = () => {
    setUpdateDescriptionError(undefined);
    setUpdateDescriptionText(undefined);
    updateTripQuery({ variables: { input: { id: trip.id, description } } });
  };

  const handleCancelDescription = () => {
    if (description !== trip.description) {
      setDescription(trip.description);
    }
    setEditingDescription(false);
    setUpdateDescriptionError(undefined);
    setUpdateDescriptionText(undefined);
  };

  const helperText =
    updateDescriptionError ||
    updateDescriptionText ||
    (loading && UPDATING_MESSAGE) ||
    '';

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
      helperText={helperText}
      error={!!updateDescriptionError}
      fullWidth
      margin='normal'
    />
  );
};

const TripStartDateSelect: React.FC<TripDetailProps> = ({ dispatch, trip }) => {
  const [startDate, setStartDate] = useState(trip.start_date);
  const [updateStartDateText, setUpdateStartDateText] = useState<JSX.Element>();
  const [updateStartDateError, setUpdateStartDateError] = useState<JSX.Element>();

  const [updateTripQuery, { loading }] = useMutation(UPDATE_TRIP, {
    onCompleted: () => {
      dispatch(updateTrip({ ...trip, start_date: startDate }));
      setUpdateStartDateError(undefined);
      setUpdateStartDateText(<SuccessText />);
    },
    onError: error => {
      setUpdateStartDateError(<ErrorText text={getFirstError(error)} />);
    }
  });

  const handleStartDateChange = (date: MaterialUiPickersDate) => {
    if (date) {
      setStartDate(date.toISOString());
      updateTripQuery({
        variables: { input: { id: trip.id, start_date: date.toISOString() } }
      });
    }
  };

  const helperText =
    updateStartDateError || updateStartDateText || (loading && UPDATING_MESSAGE) || '';

  return (
    <DateTimePicker
      label='Start Date'
      onChange={handleStartDateChange}
      helperText={helperText}
      error={!!updateStartDateError}
      value={startDate}
      margin='normal'
      fullWidth
    />
  );
};

const DEFAUL_NO_OPTIONS_TEXT = 'Enter at least four characters...';
const DEFAULT_UPDATE_LOCATION_TEXT = 'Click an option from the dropdown list to update';

const TripLocationInput: React.FC<TripDetailProps> = ({ dispatch, trip }) => {
  const newLocation = useAppSelector(
    state => state.trip.activeTripInfo && state.trip.activeTripInfo.newLocation
  );
  const [location, setLocation] = useState(trip.location_address);
  const [locationOptions, setLocationOptions] = useState<Feature[]>();
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [noOptionsText, setNoOptionsText] = useState(DEFAUL_NO_OPTIONS_TEXT);
  const [updateLocationText, setUpdateLocationText] = useState<JSX.Element | string>(
    DEFAULT_UPDATE_LOCATION_TEXT
  );
  const [updateLocationError, setUpdateLocationError] = useState<JSX.Element>();

  const [updateLocationMutation, { loading }] = useMutation(UPDATE_TRIP);

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
        })
          .then(() => {
            dispatch(
              updateTrip({
                id: trip.id,
                location: newLocation,
                location_address: locationText
              })
            );
            setUpdateLocationError(undefined);
            setUpdateLocationText(<SuccessText />);

            // Clean up the active trip state and fly to the new location
            dispatch(
              setActiveTripInfo({ newLocation: undefined, updatingLocation: false })
            );
            dispatch(setFlyTo(newLocation));
          })
          .catch(error => {
            setUpdateLocationError(<ErrorText text={getFirstError(error)} />);
          });
      });
    }
  }, [dispatch, newLocation, trip.id, updateLocationMutation]);

  const handleOnLocationChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateLocationError(undefined);
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
      })
        .then(() => {
          dispatch(
            updateTrip({
              id: trip.id,
              location: center,
              location_address: selectedLocation
            })
          );
          setUpdateLocationError(undefined);
          setUpdateLocationText(<SuccessText />);

          // Clean up the active trip state and fly to the new location
          dispatch(
            setActiveTripInfo({ newLocation: undefined, updatingLocation: false })
          );
          dispatch(setFlyTo(center));
        })
        .catch(error => {
          setUpdateLocationError(<ErrorText text={getFirstError(error)} />);
        });
    } else {
      setLocation('');
    }
  };

  const handleChooseLocation = () => {
    dispatch(setDrawer({ open: false }));
    dispatch(setActiveTripInfo({ activeMarker: `${trip.id}`, updatingLocation: true }));
  };

  const helperText =
    updateLocationError ||
    updateLocationText ||
    (loading && UPDATING_MESSAGE) ||
    'DEFAULT_UPDATE_LOCATION_TEXT';

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
          helperText={helperText}
          error={!!updateLocationError}
          onInput={handleOnLocationChange}
          inputProps={{
            ...rest.inputProps,
            value: location
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          InputProps={{
            ...InputProps,
            style: { paddingRight: 0 },
            endAdornment: <LocationInputAdornment onClick={handleChooseLocation} />
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

const TripStatusSelect: React.FC<TripDetailProps> = ({ dispatch, trip }) => {
  const [updateStatusText, setUpdateStatusText] = useState<JSX.Element>();
  const [updateStatusError, setUpdateStatusError] = useState<JSX.Element>();

  const [updateTripQuery, { loading }] = useMutation(UPDATE_TRIP);

  const handleStatusChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    updateTripQuery({ variables: { input: { id: trip.id, status: target.value } } })
      .then(() => {
        dispatch(updateTrip({ ...trip, status: target.value as any }));
        setUpdateStatusError(undefined);
        setUpdateStatusText(<SuccessText />);
      })
      .catch(error => {
        setUpdateStatusError(<ErrorText text={getFirstError(error)} />);
      });
  };

  const helperText =
    updateStatusError || updateStatusText || (loading && UPDATING_MESSAGE) || '';

  return (
    <TextField
      select
      label='Status'
      value={trip.status}
      onChange={handleStatusChange}
      helperText={helperText}
      error={!!updateStatusError}
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

const ElevatedPopperCard = styled(Card)``;
const ElevatedPopper = styled(Popper)`
  z-index: 10000;
  ${ElevatedPopperCard} {
    width: 300px;
  }
`;

const TripDeleteContainer = styled.div(
  ({ theme }) => css`
    margin-top: ${theme.spacing('sm')};
    > div {
      margin-top: ${theme.spacing('sm')};
      color: ${theme.colors.red};
    }
  `
);

const TripDelete: React.FC<TripDetailProps> = ({ dispatch, trip }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [deleteResponseText, setDeleteResponseText] = useState<React.ReactNode>();

  const [deleteTripMutation, { loading }] = useMutation(DELETE_TRIP, {
    onCompleted: data => {
      dispatch(setDrawer({ open: false }));
      dispatch(deleteTrip(data.deleteTrip));
    },
    onError: error => {
      setDeleteResponseText(<ErrorText text={getFirstError(error)} />);
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
    <TripDeleteContainer>
      <Button
        color='secondary'
        variant='contained'
        onClick={handleToggleDeletePopper}
        aria-describedby={popperId}
        disabled={loading}
      >
        <span>Delete Trip &nbsp;</span>
        <DeleteIcon />
      </Button>
      <ElevatedPopper id={popperId} open={!!anchorEl} anchorEl={anchorEl}>
        <ElevatedPopperCard>
          <ButtonGroup size='small' fullWidth>
            <Button color='secondary' onClick={handleConfirmDeleteClick}>
              Confirm Delete
            </Button>
            <Button color='primary' onClick={handleToggleDeletePopper}>
              Cancel
            </Button>
          </ButtonGroup>
        </ElevatedPopperCard>
      </ElevatedPopper>
      {deleteResponseText && <div>{deleteResponseText}</div>}
    </TripDeleteContainer>
  );
};

const TripDetail: React.FC<TripDetailProps> = ({ dispatch, trip }) => {
  return (
    <div>
      <BackToTripsButton dispatch={dispatch} />
      <TripHeader dispatch={dispatch} trip={trip} />
      <TripNameInput dispatch={dispatch} trip={trip} />
      <TripDescriptionInput dispatch={dispatch} trip={trip} />
      <TripStartDateSelect dispatch={dispatch} trip={trip} />
      <TripLocationInput dispatch={dispatch} trip={trip} />
      <TripStatusSelect dispatch={dispatch} trip={trip} />
      <TripDelete trip={trip} dispatch={dispatch} />
      <TripItineraries dispatch={dispatch} tripId={trip.id} />
    </div>
  );
};

export default TripDetail;
