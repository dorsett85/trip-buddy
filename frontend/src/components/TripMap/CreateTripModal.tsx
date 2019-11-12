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
import { AppState } from '../../store';
import { setCreateTrip } from '../../store/trip/actions';
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

const CreateTripModal: React.FC = () => {
  const dispatch = useDispatch();
  const createTrip = useSelector(({ trip }: AppState) => trip.createTrip);

  const [locationOptions, setLocationOptions] = useState<Feature[]>();
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [noOptionsText, setNoOptionsText] = useState('No Options');
  const [errors, setErrors] = useState<JSX.Element | null>();

  // Final form submit graphlql mutation
  const [createTripQuery, { loading }] = useMutation(CREATE_TRIP, {
    onCompleted: data => {
      console.log(data);
    },
    onError: error => {
      console.log(error);
    }
  });

  const handleOnClose = () => {
    dispatch(setCreateTrip(undefined));
    setLocationOptions(undefined);
    setLocation('');
    setErrors(null);
  };

  // When returning from dropping a pin for the location, perform a
  // reverse geocoding to update the locationOptions
  useEffect(() => {
    if (!locationOptions && createTrip && createTrip.start_location) {
      const [lng, lat] = createTrip.start_location;
      MapboxService.getGeocodeFeatureCollection(`${lng},${lat}`, locations => {
        const { features } = locations;
        if (features.length) {
          setLocation(features[0].place_name);
        }
      });
    }
  }, [createTrip, locationOptions]);

  // Here we only add add the modal form when creating a trip
  let openModal = false;
  let modalForm = null;
  if (createTrip) {
    openModal = !!createTrip.openModal;

    const handleNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setCreateTrip({ name: target.value }));
    };

    const handleStartDateChange = (date: MaterialUiPickersDate) => {
      dispatch(setCreateTrip({ start_date: date }));
    };

    const handleEndDateChange = (date: MaterialUiPickersDate) => {
      dispatch(setCreateTrip({ end_date: date }));
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

    const handleLocationSelect = (e: React.ChangeEvent<any>) => {
      if (locationOptions && !e.target.type) {
        const optionIdx = e.target.getAttribute('data-option-index');
        const { center } = locationOptions[optionIdx];
        setLocation(locationOptions[optionIdx].place_name);
        dispatch(setCreateTrip({ start_location: center }));
      } else {
        setLocation('');
        dispatch(setCreateTrip({ start_location: undefined }));
      }
    };

    const handleDropLocationPin = () => {
      setLocationOptions(undefined);
      setLocation('');
      dispatch(setCreateTrip({ openModal: false, start_location: undefined }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const errorList = [];

      if (!createTrip.name) {
        errorList.push('Missing trip name');
      }
      if (!createTrip.start_date) {
        errorList.push('Missing start date');
      }
      if (!createTrip.end_date) {
        errorList.push('Missing end date');
      }
      if (
        createTrip.start_date &&
        createTrip.end_date &&
        createTrip.start_date > createTrip.end_date
      ) {
        errorList.push('Start date must be before end date');
      }
      if (!createTrip.start_location) {
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
          setErrors(null);
        }
        const variables = {
          input: {
            name: createTrip.name,
            start_location: createTrip.start_location,
            start_date: createTrip.start_date,
            end_date: createTrip.end_date
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
            value={createTrip.name || ''}
            variant='filled'
            margin='normal'
            fullWidth
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label='Start Date'
                onChange={handleStartDateChange}
                value={createTrip.start_date}
                inputVariant='outlined'
                margin='normal'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label='End Date'
                onChange={handleEndDateChange}
                value={createTrip.end_date}
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
      {modalForm && <DialogTitle>Create Trip Wizard</DialogTitle>}
      {modalForm}
    </Dialog>
  );
};

export default memo(CreateTripModal);