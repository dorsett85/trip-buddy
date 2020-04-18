import React, { memo, useState } from 'react';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';
import { TripRecord } from 'common/lib/types/trip';
import { setTripCreator, addTrip, setActiveTripInfo } from '../../store/trip/reducer';
import { debounce } from '../../utils/debouce';
import { MapboxService } from '../../api/mapbox/MapBoxService';
import { Feature } from '../../types/apiResponses';
import { getFirstError } from '../../utils/apolloErrors';
import { setFlyTo } from '../../store/general/reducer';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import LocationInputAdornment from '../generic/LocationInputAdornment/LocationInputAdornment';
import { useCreateTripMutation } from '../../api/apollo/hooks/trip';

const ErrorStyled = styled.div`
  font-weight: bold;
  color: ${red[500]};
`;

const TripCreatorModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const tripCreator = useAppSelector(({ trip }) => trip.creator);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const [locationOptions, setLocationOptions] = useState<Feature[]>();
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [noOptionsText, setNoOptionsText] = useState('Enter at least four characters...');
  const [errors, setErrors] = useState<JSX.Element>();

  // Final form submit graphlql mutation
  const [createTripMutation, { loading }] = useCreateTripMutation({
    onCompleted: (data: { createTrip: TripRecord }) => {
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

    const handleLocationChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleLocationSelect = (
      _: React.ChangeEvent<{}>,
      feature: Feature | null
    ) => {
      if (feature) {
        dispatch(
          setTripCreator({
            location: feature.center,
            location_address: feature.place_name
          })
        );
      } else {
        dispatch(setTripCreator({ location: undefined, location_address: undefined }));
      }
    };

    const handleChooseLocation = () => {
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
          <DateTimePicker
            label='Start Date'
            onChange={handleStartDateChange}
            value={tripCreator.start_date || null}
            inputVariant='outlined'
            margin='normal'
            fullWidth
          />
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
                inputProps={{
                  ...rest.inputProps,
                  onInput: handleLocationChange,
                  value: tripCreator.location_address || ''
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
    <Dialog
      open={openModal}
      onClose={handleOnClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth='xs'
    >
      <DialogTitle>Create Your Trip</DialogTitle>
      {modalForm}
    </Dialog>
  );
};

export default memo(TripCreatorModal);
