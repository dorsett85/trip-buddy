import React, { memo, useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker } from '@material-ui/pickers';
import IconButton from '@material-ui/core/IconButton';
import PinDropIcon from '@material-ui/icons/PinDrop';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Red from '@material-ui/core/colors/red';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { LinearProgress } from '@material-ui/core';
import { AppState } from '../../store';
import { setTripCreator, setAddTrip, setActiveTrip } from '../../store/trip/actions';
import { debounce } from '../../utils/debouce';
import { MapboxService } from '../../api/mapbox/MapBoxService';
import { Feature } from '../../types/apiResponses';

export const CREATE_TRIP = gql`
  mutation createTrip($input: CreateTripInput) {
    createTrip(input: $input) {
      id
      name
      start_location
      start_date
      end_date
      created_date
    }
  }
`;

const ErrorListStyled = styled.div`
  font-weight: bold;
  color: ${Red[500]};
`;

const TripCreatorModal: React.FC = () => {
  const dispatch = useDispatch();
  const tripCreator = useSelector(({ trip }: AppState) => trip.tripCreator);

  const [locationOptions, setLocationOptions] = useState<Feature[]>();
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [noOptionsText, setNoOptionsText] = useState('Enter at least four characters...');
  const [errors, setErrors] = useState<JSX.Element>();

  // Final form submit graphlql mutation
  const [createTripQuery, { loading }] = useMutation(CREATE_TRIP, {
    onCompleted: data => {
      dispatch(setAddTrip(data.createTrip));
      dispatch(setTripCreator(undefined));
      dispatch(setActiveTrip({ ...data.createTrip, flyTo: true }));
    },
    onError: error => {
      console.log(error);
    }
  });

  const handleOnClose = () => {
    dispatch(setTripCreator(undefined));
    setLocationOptions(undefined);
    setLocation('');
    setErrors(undefined);
  };

  // When returning from dropping a pin for the location, perform a
  // reverse geocoding to update the locationOptions
  useEffect(() => {
    if (!locationOptions && tripCreator && tripCreator.start_location) {
      const [lng, lat] = tripCreator.start_location;
      MapboxService.getGeocodeFeatureCollection(`${lng},${lat}`, locations => {
        const { features } = locations;
        const locationText = features.length ? features[0].place_name : `${lng}, ${lat}`;
        setLocation(locationText);
      });
    }
  }, [tripCreator, locationOptions]);

  // Here we only add add the modal form when creating a trip
  let openModal = false;
  let modalForm = null;
  if (tripCreator) {
    openModal = !!tripCreator.openModal;

    const handleNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setTripCreator({ name: target.value }));
    };

    const handleStartDateChange = (date: MaterialUiPickersDate) => {
      dispatch(setTripCreator({ start_date: date }));
    };

    const handleEndDateChange = (date: MaterialUiPickersDate) => {
      dispatch(setTripCreator({ end_date: date }));
    };

    const handleLocationChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setLocation(target.value);
      // Wait for the input to be a least 4 characters before search
      if (target.value.length <= 3) {
        setNoOptionsText('Enter at least four characters...');
        setLocationOptions(undefined);
      } else if (target.value.length > 3) {
        setNoOptionsText('No options');
        setLocationsLoading(true);
        debounce(() => {
          MapboxService.getGeocodeFeatureCollection(target.value, locations => {
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
        setLocation(locationOptions[optionIdx].place_name);
        dispatch(setTripCreator({ start_location: center }));
      } else {
        setLocation('');
        dispatch(setTripCreator({ start_location: undefined }));
      }
    };

    const handleDropLocationPin = () => {
      setLocationOptions(undefined);
      dispatch(setTripCreator({ openModal: false }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const errorList = [];

      if (!tripCreator.name) {
        errorList.push('Missing trip name');
      }
      if (!tripCreator.start_date) {
        errorList.push('Missing start date');
      }
      if (!tripCreator.end_date) {
        errorList.push('Missing end date');
      }
      if (
        tripCreator.start_date &&
        tripCreator.end_date &&
        tripCreator.start_date > tripCreator.end_date
      ) {
        errorList.push('Start date must be before end date');
      }
      if (!tripCreator.start_location) {
        errorList.push('Missing start location');
      }

      // Populate the form with any errors, otherwise create the new trip
      if (errorList.length) {
        const errorUl = (
          <ErrorListStyled>
            <p>Whoops! Please correct the following errors</p>
            <ul>
              {errorList.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </ErrorListStyled>
        );
        setErrors(errorUl);
      } else {
        if (errors) {
          setErrors(undefined);
        }
        const variables = {
          input: {
            name: tripCreator.name,
            start_location: tripCreator.start_location,
            start_date: tripCreator.start_date,
            end_date: tripCreator.end_date
          }
        };
        createTripQuery({ variables });
      }
    };

    modalForm = (
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <TextField
            label='Trip Name'
            onChange={handleNameChange}
            value={tripCreator.name || ''}
            variant='outlined'
            margin='normal'
            fullWidth
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label='Start Date'
                onChange={handleStartDateChange}
                value={tripCreator.start_date}
                inputVariant='outlined'
                margin='normal'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label='End Date'
                onChange={handleEndDateChange}
                value={tripCreator.end_date}
                inputVariant='outlined'
                margin='normal'
                fullWidth
              />
            </Grid>
          </Grid>
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
                name='startLocation'
                onInput={handleLocationChange}
                inputProps={{
                  ...rest.inputProps,
                  value: location
                }}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                InputProps={{
                  ...InputProps,
                  endAdornment: (
                    <InputAdornment title='Drop pin' position='end'>
                      <IconButton onClick={handleDropLocationPin}>
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
          {errors}
        </DialogContent>
        {loading && <LinearProgress />}
        <DialogActions>
          <Button onClick={handleOnClose} variant='contained'>
            Cancel
          </Button>
          <Button type='submit' color='primary' variant='contained'>
            Create Trip
          </Button>
        </DialogActions>
      </form>
    );
  }

  return (
    <Dialog open={openModal} onClose={handleOnClose}>
      {modalForm && <DialogTitle>Create Your Trip</DialogTitle>}
      {modalForm}
    </Dialog>
  );
};

export default memo(TripCreatorModal);
