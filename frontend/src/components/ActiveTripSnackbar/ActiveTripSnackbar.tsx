import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { AppState } from '../../store';

const ActiveTripSnackbar = () => {
  const activeTrip = useSelector((state: AppState) => state.trip.activeTrip);
  const openDrawer = useSelector((state: AppState) => state.general.openDrawer);

  const open = !!activeTrip && !openDrawer;
  const message =
    activeTrip &&
    `"${activeTrip.name}" trip is active, click the marker to view details or click the map to close...`;

  return <Snackbar open={open} message={message} />;
};

export default memo(ActiveTripSnackbar);