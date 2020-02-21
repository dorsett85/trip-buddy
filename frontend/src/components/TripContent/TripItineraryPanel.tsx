import React, { memo, useState, useEffect } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Card from '@material-ui/core/Card';
import LinearProgress from '@material-ui/core/LinearProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import styled, { css } from 'styled-components';
import { DateTimePicker } from '@material-ui/pickers';
import { DispatchProp } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { TripItineraryRecord } from 'common/lib/types/tripItinerary';
import { UPDATING_MESSAGE } from '../../utils/constants/messages';
import { getFirstError } from '../../utils/apolloErrors';
import {
  updateTripItinerary,
  setActiveTripInfo,
  deleteTripItinerary
} from '../../store/trip/reducer';
import EditableTextField from '../generic/EditableTextField/EditableTextField';
import { setFlyTo, setDrawer } from '../../store/general/reducer';
import { Feature } from '../../types/apiResponses';
import { debounce } from '../../utils/debouce';
import { MapboxService } from '../../api/mapbox/MapBoxService';
import { UPDATE_ITINERARY, DELETE_ITINERARY } from '../ApolloProvider/gql/trip';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import LocationInputAdornment from '../generic/LocationInputAdornment/LocationInputAdornment';
import ErrorText from '../AppText/ErrorText';
import SuccessText from '../AppText/SuccessText';

interface TripItineraryPanelProps extends DispatchProp {
  /**
   * Itinerary of the active trip
   */
  itinerary: TripItineraryRecord;
  /**
   * Index of the active trip itineraries, used for display
   */
  index: number;
}

interface ItineraryButtonGroupProps extends Omit<TripItineraryPanelProps, 'index'> {
  onEditingNameClick: () => void;
}

type ItineraryInputProps = Omit<TripItineraryPanelProps, 'index'>;

interface IntineraryNameInputProps extends ItineraryInputProps {
  /**
   * Event handler for when the input is submitted or cancelled
   */
  onSubmitOrCancel: () => void;
}

const BEM_ITINERARY_PANEL = 'itineraryPanel';
const BEM_ITINERARY_PANEL_SUMMARY = `${BEM_ITINERARY_PANEL}-summary`;
const BEM_ITINERARY_PANEL_CONTENT = `${BEM_ITINERARY_PANEL}-content`;

const ExpansionPanelStyled = styled(ExpansionPanel)(
  ({ theme }) => css`
    & .${BEM_ITINERARY_PANEL_SUMMARY}, & .${BEM_ITINERARY_PANEL_CONTENT} {
      padding: 0 ${theme.spacing()};
    }
    & .${BEM_ITINERARY_PANEL_SUMMARY} {
      background-color: ${theme.colors.primary};
      span {
        color: white;
        font-size: 1rem;
        font-weight: bold;
      }
    }
    & .${BEM_ITINERARY_PANEL_CONTENT} {
      padding-bottom: ${theme.spacing()};
    }
  `
);

const ItineraryContent = styled.div`
  width: 100%;
`;

const ElevatedPopper = styled(Popper)`
  z-index: 10000;
`;

const ErrorResponse = styled.div(
  ({ theme }) => css`
    margin-top: 0.5rem;
    color: ${theme.colors.red};
  `
);

const ItineraryButtonGroup: React.FC<ItineraryButtonGroupProps> = ({
  dispatch,
  itinerary,
  onEditingNameClick
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [deleteResponseText, setDeleteResponseText] = useState('');
  const [deleteItineraryMutation, { loading }] = useMutation(DELETE_ITINERARY, {
    onCompleted: data => {
      dispatch(deleteTripItinerary(data.deleteTripItinerary));
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
    deleteItineraryMutation({ variables: { id: itinerary.id } });
  };

  const popperId = anchorEl ? 'delete-popper' : undefined;

  return (
    <>
      <ButtonGroup size='small' color='primary' fullWidth disabled={loading}>
        <Button onClick={onEditingNameClick} variant='text'>
          Edit Name
        </Button>
        <Button
          onClick={handleToggleDeletePopper}
          aria-describedby={popperId}
          color='secondary'
          variant='text'
          disabled={loading}
        >
          Remove Itinerary
        </Button>
      </ButtonGroup>
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
      {loading && <LinearProgress />}
      {deleteResponseText && <ErrorResponse>{deleteResponseText}</ErrorResponse>}
    </>
  );
};

const ItineraryNameInput: React.FC<IntineraryNameInputProps> = ({
  dispatch,
  itinerary,
  onSubmitOrCancel
}) => {
  const [name, setName] = useState(itinerary.name);
  const [updateNameError, setUpdateNameError] = useState<JSX.Element>();

  const [updateTripItineraryQuery, { loading }] = useMutation(UPDATE_ITINERARY, {
    onCompleted: () => {
      dispatch(updateTripItinerary({ ...itinerary, name }));
      onSubmitOrCancel();
    },
    onError: error => {
      setUpdateNameError(<ErrorText text={getFirstError(error)} />);
    }
  });

  const handleNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setName(target.value);
  };

  const handleSubmitName = () => {
    if (name.length >= 4) {
      updateTripItineraryQuery({ variables: { input: { id: itinerary.id, name } } });
    } else {
      setUpdateNameError(<ErrorText text='Trip name must be at least 4 characters' />);
    }
  };

  const handleCancelName = () => {
    if (name !== itinerary.name) {
      setName(itinerary.name);
    }
    onSubmitOrCancel();
  };

  const helperText = updateNameError || (loading && UPDATING_MESSAGE) || '';

  return (
    <EditableTextField
      label='Name'
      value={name}
      editing
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

const ItineraryDescriptionInput: React.FC<ItineraryInputProps> = ({
  dispatch,
  itinerary
}) => {
  const [description, setDescription] = useState(itinerary.description);
  const [editingDescription, setEditingDescription] = useState(false);
  const [updateDescriptionText, setUpdateDescriptionText] = useState<JSX.Element>();
  const [updateDescriptionError, setUpdateDescriptionError] = useState<JSX.Element>();

  const [updateTripQuery, { loading }] = useMutation(UPDATE_ITINERARY, {
    onCompleted: () => {
      dispatch(updateTripItinerary({ ...itinerary, description }));
      setEditingDescription(false);
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
    updateTripQuery({ variables: { input: { id: itinerary.id, description } } });
  };

  const handleCancelDescription = () => {
    if (description !== itinerary.description) {
      setDescription(itinerary.description);
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

const ItineraryStartDateSelect: React.FC<ItineraryInputProps> = ({
  dispatch,
  itinerary
}) => {
  const [startTime, setStartTime] = useState(itinerary.start_time);
  const [updateStartDateText, setUpdateStartDateText] = useState<JSX.Element>();
  const [updateStartDateError, setUpdateStartDateError] = useState<JSX.Element>();

  const [updateTripItineraryQuery, { loading }] = useMutation(UPDATE_ITINERARY, {
    onCompleted: () => {
      dispatch(updateTripItinerary({ ...itinerary, start_time: startTime }));
      setUpdateStartDateError(undefined);
      setUpdateStartDateText(<SuccessText />);
    },
    onError: error => {
      setUpdateStartDateError(<ErrorText text={getFirstError(error)} />);
    }
  });

  const handleStartDateChange = (date: MaterialUiPickersDate) => {
    if (date) {
      setStartTime(date.toISOString());
      updateTripItineraryQuery({
        variables: { input: { id: itinerary.id, start_time: date.toISOString() } }
      });
    }
  };

  const helperText =
    updateStartDateError || updateStartDateText || (loading && UPDATING_MESSAGE) || '';

  return (
    <DateTimePicker
      label='Start Time'
      onChange={handleStartDateChange}
      helperText={helperText}
      error={!!updateStartDateError}
      value={startTime}
      margin='normal'
      fullWidth
    />
  );
};

const DEFAULT_NO_OPTIONS_TEXT = 'Enter at least four characters...';
const DEFAULT_UPDATE_LOCATION_TEXT = 'Click an option from the dropdown list to update';

const ItineraryLocationInput: React.FC<ItineraryInputProps> = ({
  dispatch,
  itinerary
}) => {
  const updatingItineraryLocationId = useAppSelector(
    ({ trip }) => trip.activeTripInfo && trip.activeTripInfo.updatingItineraryLocationId
  );
  const newLocation = useAppSelector(
    ({ trip }) => trip.activeTripInfo && trip.activeTripInfo.newItineraryLocation
  );
  const [location, setLocation] = useState(itinerary.location_address);
  const [locationOptions, setLocationOptions] = useState<Feature[]>();
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [noOptionsText, setNoOptionsText] = useState(DEFAULT_NO_OPTIONS_TEXT);
  const [updateLocationText, setUpdateLocationText] = useState<JSX.Element | string>(
    DEFAULT_UPDATE_LOCATION_TEXT
  );
  const [updateLocationError, setUpdateLocationError] = useState<JSX.Element>();

  const [updateLocationMutation, { loading }] = useMutation(UPDATE_ITINERARY);

  // Listener for updating the itinerary location. This will fire after a location
  // is selected on the map and the newLocation lng/lat is set
  useEffect(() => {
    if (newLocation && updatingItineraryLocationId === itinerary.id) {
      const lngLatString = newLocation.toString();
      MapboxService.getGeocodeFeatureCollection(lngLatString).then(featureCollection => {
        const { features } = featureCollection;
        const locationText = features.length ? features[0].place_name : lngLatString;
        setLocation(locationText);
        updateLocationMutation({
          variables: {
            input: {
              id: itinerary.id,
              location: newLocation,
              location_address: locationText
            }
          }
        })
          .then(() => {
            dispatch(
              updateTripItinerary({
                id: itinerary.id,
                location: newLocation,
                location_address: locationText
              })
            );
            setUpdateLocationError(undefined);
            setUpdateLocationText(<SuccessText />);

            // Clean up the active trip state and fly to the new location
            dispatch(
              setActiveTripInfo({
                newItineraryLocation: undefined,
                updatingItineraryLocationId: undefined
              })
            );
            dispatch(setFlyTo(newLocation));
          })
          .catch(error => {
            setUpdateLocationError(<ErrorText text={getFirstError(error)} />);
          });
      });
    }
  }, [
    dispatch,
    itinerary.id,
    newLocation,
    updateLocationMutation,
    updatingItineraryLocationId
  ]);

  const handleOnLocationChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateLocationError(undefined);
    setUpdateLocationText(DEFAULT_UPDATE_LOCATION_TEXT);
    setLocation(target.value);
    // Wait for the input to be a least 4 characters before search
    if (target.value.length <= 3) {
      setNoOptionsText(DEFAULT_NO_OPTIONS_TEXT);
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
      dispatch(
        setActiveTripInfo({ activeMarker: `${itinerary.trip_id}-${itinerary.id}` })
      );
      updateLocationMutation({
        variables: {
          input: {
            id: itinerary.id,
            location: center,
            location_address: selectedLocation
          }
        }
      })
        .then(() => {
          dispatch(
            updateTripItinerary({
              id: itinerary.id,
              location: center,
              location_address: selectedLocation
            })
          );
          setUpdateLocationError(undefined);
          setUpdateLocationText(<SuccessText />);

          // Clean up the active trip state and fly to the new location
          dispatch(
            setActiveTripInfo({
              newItineraryLocation: undefined,
              updatingItineraryLocationId: undefined
            })
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
    dispatch(
      setActiveTripInfo({
        activeMarker: `${itinerary.trip_id}-${itinerary.id}`,
        updatingItineraryLocationId: itinerary.id
      })
    );
    dispatch(setDrawer({ open: false }));
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

const TripItineraryPanel: React.FC<TripItineraryPanelProps> = ({
  dispatch,
  itinerary,
  index
}) => {
  const [expanded, setExpanded] = useState(true);
  const [editingName, setEditingName] = useState(false);

  const handleExpandClick = () => {
    setExpanded(state => !state);
  };

  const handleEditingName = () => {
    setEditingName(!editingName);
  };

  const itineraryContent = (
    <ItineraryContent>
      <ItineraryButtonGroup
        dispatch={dispatch}
        itinerary={itinerary}
        onEditingNameClick={handleEditingName}
      />
      {editingName && (
        <ItineraryNameInput
          dispatch={dispatch}
          itinerary={itinerary}
          onSubmitOrCancel={handleEditingName}
        />
      )}
      <ItineraryDescriptionInput dispatch={dispatch} itinerary={itinerary} />
      <ItineraryStartDateSelect dispatch={dispatch} itinerary={itinerary} />
      <ItineraryLocationInput dispatch={dispatch} itinerary={itinerary} />
    </ItineraryContent>
  );

  return (
    <ExpansionPanelStyled expanded={expanded} onChange={handleExpandClick}>
      <ExpansionPanelSummary
        className='itineraryPanel-summary'
        expandIcon={<ExpandMoreIcon />}
      >
        <span>
          {index + 1}
          .&nbsp;
          {itinerary.name}
        </span>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className='itineraryPanel-content'>
        {itineraryContent}
      </ExpansionPanelDetails>
    </ExpansionPanelStyled>
  );
};

export default memo(TripItineraryPanel);
