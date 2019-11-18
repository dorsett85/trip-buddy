import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { AppState } from '../../store';
import { setTripCreator } from '../../store/trip/actions';

const TripCreatorSnackbar = () => {
  const dispatch = useDispatch();
  const open = useSelector(
    ({ trip }: AppState) => !!trip.tripCreator && !trip.tripCreator.openModal
  );

  const handleClose = () => {
    dispatch(setTripCreator({ openModal: true }));
  };

  return (
    <Snackbar
      open={open}
      message='Select a location for your trip'
      action={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <IconButton onClick={handleClose} key='close' aria-label='close' color='inherit'>
          <CloseIcon />
        </IconButton>
      }
    />
  );
};

export default TripCreatorSnackbar;
