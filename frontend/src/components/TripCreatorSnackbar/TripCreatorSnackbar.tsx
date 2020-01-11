import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { AppState } from '../../store';
import { setTripCreator } from '../../store/trip/actions';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';

const TripCreatorSnackbar = () => {
  const dispatch = useAppDispatch();
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

export default memo(TripCreatorSnackbar);
