import React, { memo, useState } from 'react';
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
import { useSelector } from 'react-redux';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { LinearProgress } from '@material-ui/core';
import { AppState } from '../../store';
import { setTripCreator, addTrip, setActiveTripInfo } from '../../store/trip/actions';
import { debounce } from '../../utils/debouce';
import { MapboxService } from '../../api/mapbox/MapBoxService';
import { Feature } from '../../types/apiResponses';
import { getFirstError } from '../../utils/apolloErrors';
import { setFlyTo } from '../../store/general/actions';
import { Trip } from '../../types/trip';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';

export const CREATE_TRIP = gql`
  mutation createTrip($input: CreateTripInput) {
    createTrip(input: $input) {
      id
      name
      description
      location
      location_address
      start_date
      status
      created_date
    }
  }
`;

const FormStyled = styled.form`
  min-width: 450px;
`;

const ErrorStyled = styled.div`
  font-weight: bold;
  color: ${Red[500]};
`;

const TripCreatorModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const tripCreator = useSelector(({ trip }: AppState) => trip.tripCreator);

  const [locationOptions, setLocationOptions] = useState<Feature[]>();
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [noOptionsText, setNoOptionsText] = useState('Enter at least four characters...');
  const [errors, setErrors] = useState<JSX.Element>();

  // Final form submit graphlql mutation
  const [createTripMutation, { loading }] = useMutation(CREATE_TRIP, {
    onCompleted: (data: { createTrip: Trip }) => {
      dispatch(addTrip(data.createTrip));
      dispatch(setTripCreator());

      // Set trip specific redux state so the created trip will
      // automatically have an active marker and fly to its location
      dispatch(
        setActiveTripInfo({
          id: data.createTrip.id,
          activeMarker: data.createTrip.id.toString()
        })
      );
      dispatch(setFlyTo(data.createTrip.location));
    },
    onError: error => {
      setErrors(<ErrorStyled>{getFirstError(error)}</ErrorStyled>);
    }
  });

  const handleOnClose = () => {
    dispatch(setTripCreator());
    setLocationOptions(undefined);
    setErrors(undefined);
  };

  // Here we only add add the modal form when creating a trip
  let openModal = false;
  let modalForm = null;
  if (tripCreator) {
    openModal = !!tripCreator.openModal;

    const handleNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setTripCreator({ name: target.value }));
    };

    const handleDescriptionChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setTripCreator({ description: target.value }));
    };

    const handleStartDateChange = (date: MaterialUiPickersDate) => {
      if (date) {
        dispatch(setTripCreator({ start_date: date.toISOString() }));
      }
    };

    const handleLocationChange = ({ target }: any) => {
      dispatch(setTripCreator({ location_address: target.value }));
      if (tripCreator.location) {
        dispatch(setTripCreator({ location: undefined }));
      }
      // Wait for the input to be a least 4 characters before search
      if (target.value.length <= 3) {
        setNoOptionsText('Enter at least four characters...');
        setLocationOptions(undefined);
      } else if (target.value.length > 3) {
        setNoOptionsText('No options');
        setLocationsLoading(true);
        debounce(() => {
          MapboxService.getGeocodeFeatureCollection(target.value).then(
            featureCollection => {
              setLocationOptions(featureCollection.features);
              setLocationsLoading(false);
            }
          );
        }, 1000);
      }
    };

    const handleLocationSelect = ({ target }: React.ChangeEvent<any>) => {
      const optionIdx = target.getAttribute('data-option-index');
      if (locationOptions && optionIdx) {
        const { center } = locationOptions[optionIdx];
        dispatch(
          setTripCreator({
            location: center,
            location_address: locationOptions[optionIdx].place_name
          })
        );
      } else {
        dispatch(setTripCreator({ location: undefined, location_address: undefined }));
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
      if (!tripCreator.location || !tripCreator.location_address) {
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
            name: tripCreator.name,
            description: tripCreator.description,
            start_date: tripCreator.start_date,
            location: tripCreator.location,
            location_address: tripCreator.location_address
          }
        };
        createTripMutation({ variables });
      }
    };

    modalForm = (
      <FormStyled onSubmit={handleSubmit}>
        <DialogContent dividers>
          <TextField
            label='Trip Name'
            onChange={handleNameChange}
            value={tripCreator.name || ''}
            variant='outlined'
            margin='normal'
            fullWidth
          />
          <TextField
            label='Description'
            onChange={handleDescriptionChange}
            value={tripCreator.description || ''}
            placeholder='Optional... describe your trip here'
            multiline
            rows={2}
            variant='filled'
            margin='normal'
            fullWidth
          />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DateTimePicker
                label='Start Date'
                onChange={handleStartDateChange}
                value={tripCreator.start_date || null}
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
                inputProps={{
                  ...rest.inputProps,
                  onInput: handleLocationChange,
                  value: tripCreator.location_address || ''
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
      </FormStyled>
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
