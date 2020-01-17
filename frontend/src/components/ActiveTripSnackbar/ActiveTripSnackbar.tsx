import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { AppState } from '../../store';
import { useActiveTrip } from '../../utils/hooks/useActiveTrip';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { setOpenDrawer } from '../../store/general/actions';
import { setActiveTrip } from '../../store/trip/actions';

const ActiveTripSnackbar = () => {
  const dispatch = useAppDispatch();
  const activeTrip = useActiveTrip();
  const updatingLocation = useSelector(
    (state: AppState) => !!state.trip.activeTrip && state.trip.activeTrip.updatingLocation
  );
  const openDrawer = useSelector((state: AppState) => state.general.openDrawer);

  // Never show the snackbar if there's no activeTrip
  if (!activeTrip) {
    return null;
  }

  const handleClose = () => {
    dispatch(setActiveTrip({ updatingLocation: false }));
    dispatch(setOpenDrawer(true));
  };

  const action = updatingLocation && (
    <IconButton onClick={handleClose} key='close' aria-label='close' color='inherit'>
      <CloseIcon />
    </IconButton>
  );

  const message = updatingLocation
    ? 'Select a location for your trip'
    : `"${activeTrip.name}" trip is active, click the marker to view details or click the map to close...`;

  return <Snackbar open={!openDrawer} message={message} action={action} />;
};

export default memo(ActiveTripSnackbar);
