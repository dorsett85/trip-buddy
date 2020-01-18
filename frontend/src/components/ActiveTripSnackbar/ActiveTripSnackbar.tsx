import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { AppState } from '../../store';
import { useActiveTrip } from '../../utils/hooks/useTrip';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { setOpenDrawer } from '../../store/general/actions';
import { setActiveTripInfo } from '../../store/trip/actions';

const ActiveTripSnackbar = () => {
  const dispatch = useAppDispatch();
  const activeTrip = useActiveTrip();
  const updatingLocation = useSelector(
    ({ trip }: AppState) => !!trip.activeTripInfo && trip.activeTripInfo.updatingLocation
  );
  const updatingItineraryLocation = useSelector(
    ({ trip }: AppState) =>
      !!trip.activeTripInfo && trip.activeTripInfo.updatingItineraryLocation !== undefined
  );
  const openDrawer = useSelector((state: AppState) => state.general.openDrawer);

  // Never show the snackbar if there's no activeTrip
  if (!activeTrip) {
    return null;
  }

  const handleClose = () => {
    dispatch(setOpenDrawer(true));
    dispatch(
      setActiveTripInfo({ updatingLocation: false, updatingItineraryLocation: undefined })
    );
  };

  const action = (updatingLocation || updatingItineraryLocation) && (
    <IconButton onClick={handleClose} key='close' aria-label='close' color='inherit'>
      <CloseIcon />
    </IconButton>
  );

  const message = updatingLocation
    ? 'Select a location for your trip'
    : updatingItineraryLocation
    ? 'Select a location for your itinerary'
    : `"${activeTrip.name}" trip is active, click the marker to view details or click the map to close...`;

  return <Snackbar open={!openDrawer} message={message} action={action} />;
};

export default memo(ActiveTripSnackbar);
