import React, { memo } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { setTripCreator } from '../../store/trip/reducer';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { useAppSelector } from '../../store/hooks/useAppSelector';

const TripCreatorSnackbar = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(({ trip }) => !!trip.creator && !trip.creator.openModal);

  const handleClose = () => {
    dispatch(setTripCreator({ openModal: true }));
  };

  const action = (
    <IconButton onClick={handleClose} key='close' aria-label='close' color='inherit'>
      <CloseIcon />
    </IconButton>
  );

  return (
    <Snackbar open={open} message='Select a location for your trip' action={action} />
  );
};

export default memo(TripCreatorSnackbar);
