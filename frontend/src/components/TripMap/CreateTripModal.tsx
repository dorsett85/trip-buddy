import React, { memo } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker } from '@material-ui/pickers';
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
    const startLocation = createTrip.start_location;
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

    const handleSelectLocation = () => {
      dispatch(setCreateTrip({ openModal: false }));
    };

    modalForm = (
      <form>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label='Trip Name'
                onChange={handleOnChange}
                value={tripName}
                name='name'
                variant='filled'
                margin='normal'
                fullWidth
              />
            </Grid>
          </Grid>
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={handleSelectLocation}
                color='primary'
                variant='outlined'
                fullWidth
              >
                Select Start Location
              </Button>
              {startLocation}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={handleSelectLocation}
                color='primary'
                variant='outlined'
                fullWidth
              >
                Select End Location
              </Button>
              {endLocation}
            </Grid>
          </Grid>
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
