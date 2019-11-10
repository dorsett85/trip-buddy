import React, { memo } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { AppState } from '../../store';
import { setCreateTrip } from '../../store/trip/actions';

const CreateTripModal: React.FC = () => {
  const dispatch = useDispatch();
  const createTrip = useSelector(({ trip }: AppState) => trip.createTrip);

  const handleClose = () => {
    dispatch(setCreateTrip(undefined));
  };

  // Here we only add add the modal form when creating a trip
  let openModal = false;
  let modalForm = null;
  if (createTrip) {
    openModal = !!createTrip.openModal;

    // Declare input values
    const tripName = createTrip.name || '';
    const startDate = createTrip.start_date || new Date();
    const endDate = createTrip.end_date || new Date();
    const startLocation = createTrip.start_location
      ? createTrip.start_location.toString()
      : '';
    const endLocation = createTrip.end_location;

    const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setCreateTrip({ [target.name]: target.value }));
    };

    const handleStartDateChange = (date: MaterialUiPickersDate) => {
      dispatch(setCreateTrip({ start_date: date }));
    };

    const handleEndDateChange = (date: MaterialUiPickersDate) => {
      dispatch(setCreateTrip({ end_date: date }));
    };

    const handleOnLocationChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      console.log(target.value);
    };

    const handleOnDropPin = () => {
      dispatch(setCreateTrip({ openModal: false }));
    };

    modalForm = (
      <form>
        <DialogContent dividers>
          <TextField
            label='Trip Name'
            onChange={handleOnChange}
            value={tripName}
            name='name'
            variant='filled'
            margin='normal'
            fullWidth
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label='Start Date'
                onChange={handleStartDateChange}
                value={startDate}
                inputVariant='outlined'
                margin='normal'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label='End Date'
                onChange={handleEndDateChange}
                value={endDate}
                inputVariant='outlined'
                margin='normal'
                fullWidth
              />
            </Grid>
          </Grid>
          <Autocomplete
            options={[
              { title: 'top100Films', year: 2001 },
              { title: 'asdf', year: 2012 }
            ]}
            getOptionLabel={(option: any) => option.title}
            renderInput={({ InputProps, InputLabelProps, ...rest }) => (
              <TextField
                {...rest}
                label='Start location'
                placeholder='Enter a location or drop a pin...'
                onInput={handleOnLocationChange}
                value={startLocation}
                InputProps={{
                  ...InputProps,
                  endAdornment: (
                    <InputAdornment title='Drop pin' position='end'>
                      <IconButton onClick={handleOnDropPin}>
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
          <Autocomplete
            options={[
              { title: 'top100Films', year: 2001 },
              { title: 'asdf', year: 2012 }
            ]}
            getOptionLabel={(option: any) => option.title}
            renderInput={({ InputProps, InputLabelProps, ...rest }) => (
              <TextField
                {...rest}
                label='End location'
                placeholder='Enter a location or drop a pin...'
                onInput={handleOnLocationChange}
                InputLabelProps={{ ...InputLabelProps, shrink: true }}
                InputProps={{
                  ...InputProps,
                  endAdornment: (
                    <InputAdornment title='Drop pin' position='end'>
                      <IconButton onClick={handleOnDropPin}>
                        <PinDropIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                variant='outlined'
                margin='normal'
                fullWidth
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained'>
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
    <Dialog open={openModal} onClose={handleClose}>
      {modalForm && <DialogTitle>Create Trip Wizard</DialogTitle>}
      {modalForm}
    </Dialog>
  );
};

export default memo(CreateTripModal);
