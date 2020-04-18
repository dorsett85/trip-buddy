import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import styled, { css } from 'styled-components';
import { DispatchProp } from 'react-redux';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { TripItineraryCreator } from '../../store/trip/types';
import {
  setTripItineraryCreator,
  addTripItinerary,
  setActiveTripInfo
} from '../../store/trip/reducer';
import { Feature } from '../../types/apiResponses';
import { setFlyTo, setDrawer } from '../../store/general/reducer';
import { getFirstError } from '../../utils/apolloErrors';
import { MapboxService } from '../../api/mapbox/MapBoxService';
import { debounce } from '../../utils/debouce';
import LocationInputAdornment from '../generic/LocationInputAdornment/LocationInputAdornment';
import { useCreateTripItineraryMutation } from '../../api/apollo/hooks/tripItinerary';

interface TripItineraryCreateProps extends DispatchProp {
  itinerary: TripItineraryCreator;
}

const CardHeaderStyled = styled(CardHeader)``;

const CardStyled = styled(Card)(
  ({ theme }) => css`
    margin-bottom: 2rem;
    ${CardHeaderStyled} {
      background-color: ${theme.colors.green};
      span {
        color: white;
        font-weight: bold;
      }
    }
  `
);

const ErrorStyled = styled.div(
  ({ theme }) => css`
    font-weight: bold;
    color: ${theme.colors.red};
  `
);

const ItineraryNameInput: React.FC<TripItineraryCreateProps> = ({
  itinerary,
  dispatch
}) => {
  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTripItineraryCreator({ name: target.value }));
  };

  return (
    <TextField
      label='Itinerary Name'
      onChange={handleOnChange}
      value={itinerary.name || ''}
      variant='outlined'
      margin='normal'
      fullWidth
    />
  );
};

const ItineraryDescriptionInput: React.FC<TripItineraryCreateProps> = ({
  itinerary,
  dispatch
}) => {
  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTripItineraryCreator({ description: target.value }));
  };

  return (
    <TextField
      label='Description'
      onChange={handleOnChange}
      value={itinerary.description || ''}
      placeholder='Optional... describe your itinerary here'
      multiline
      rows={2}
      variant='filled'
      margin='normal'
      fullWidth
    />
  );
};

const ItineraryStartTimeInput: React.FC<TripItineraryCreateProps> = ({
  itinerary,
  dispatch
}) => {
  const handleOnChange = (date: MaterialUiPickersDate) => {
    if (date) {
      dispatch(setTripItineraryCreator({ start_time: date.toISOString() }));
    }
  };

  return (
    <DateTimePicker
      label='Start Date'
      onChange={handleOnChange}
      value={itinerary.start_time || null}
      inputVariant='outlined'
      margin='normal'
      fullWidth
    />
  );
};

const DEFAUL_NO_OPTIONS_TEXT = 'Enter at least four characters...';

const ItineraryLocationInput: React.FC<TripItineraryCreateProps> = ({
  dispatch,
  itinerary
}) => {
  const [locationOptions, setLocationOptions] = useState<Feature[]>();
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [noOptionsText, setNoOptionsText] = useState(DEFAUL_NO_OPTIONS_TEXT);

  const handleOnLocationChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTripItineraryCreator({ location_address: target.value }));
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
      dispatch(
        setTripItineraryCreator({ location: center, location_address: selectedLocation })
      );
    } else {
      dispatch(
        setTripItineraryCreator({ location: undefined, location_address: undefined })
      );
    }
  };

  const handleDropLocationPinClick = () => {
    dispatch(setDrawer({ open: false }));
  };

  return (
    <Autocomplete
      options={locationOptions || []}
      loading={locationsLoading}
      onChange={handleLocationSelect}
      noOptionsText={noOptionsText}
      getOptionLabel={(option: Feature) => option.place_name}
      renderInput={({ InputProps, InputLabelProps, ...rest }) => (
        <TextField
          {...rest}
          label='Start location'
          placeholder='Enter a location or drop a pin...'
          onInput={handleOnLocationChange}
          inputProps={{
            ...rest.inputProps,
            value: itinerary.location_address || ''
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          InputProps={{
            ...InputProps,
            style: { paddingRight: 0 },
            endAdornment: <LocationInputAdornment onClick={handleDropLocationPinClick} />
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

const TripItineraryCreate: React.FC<TripItineraryCreateProps> = ({
  itinerary,
  dispatch
}) => {
  const [errors, setErrors] = useState<JSX.Element>();
  const [createItineraryMutation, { loading }] = useCreateTripItineraryMutation({
    onCompleted: ({ createTripItinerary }) => {
      dispatch(setTripItineraryCreator());
      dispatch(addTripItinerary(createTripItinerary));
      dispatch(setFlyTo(createTripItinerary.location));
      dispatch(
        setActiveTripInfo({
          activeMarker: `${createTripItinerary.trip_id}-${createTripItinerary.id}`
        })
      );
    },
    onError: error => {
      setErrors(<ErrorStyled>{getFirstError(error)}</ErrorStyled>);
    }
  });

  const handleCancelClick = () => {
    dispatch(setTripItineraryCreator());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorList = [];

    if (!itinerary.name) {
      errorList.push('Missing itinerary name');
    }
    if (!itinerary.start_time) {
      errorList.push('Missing start time');
    }
    if (!itinerary.location || !itinerary.location_address) {
      errorList.push('Missing start location, select an item from the dropdown');
    }

    // Populate the form with any errors, otherwise create the new trip
    if (errorList.length) {
      const errorUl = (
        <ErrorStyled>
          <p>Whoops! Please correct the following errors</p>
          <ul>
            {errorList.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </ErrorStyled>
      );
      setErrors(errorUl);
    } else {
      if (errors) {
        setErrors(undefined);
      }
      const variables = {
        input: {
          trip_id: itinerary.trip_id,
          name: itinerary.name,
          description: itinerary.description,
          start_time: itinerary.start_time,
          location: itinerary.location,
          location_address: itinerary.location_address
        }
      };
      createItineraryMutation({ variables });
    }
  };

  return (
    <CardStyled raised>
      <CardHeaderStyled subheader='Create Itinerary' />
      <form onSubmit={handleSubmit}>
        <CardContent>
          <ItineraryNameInput itinerary={itinerary} dispatch={dispatch} />
          <ItineraryDescriptionInput itinerary={itinerary} dispatch={dispatch} />
          <ItineraryStartTimeInput itinerary={itinerary} dispatch={dispatch} />
          <ItineraryLocationInput itinerary={itinerary} dispatch={dispatch} />
          {errors}
          {loading && <LinearProgress />}
        </CardContent>
        <CardActions>
          <Button onClick={handleCancelClick} variant='contained'>
            Cancel
          </Button>
          <Button type='submit' color='primary' variant='contained'>
            Create Itinerary
          </Button>
        </CardActions>
      </form>
    </CardStyled>
  );
};

export default TripItineraryCreate;
