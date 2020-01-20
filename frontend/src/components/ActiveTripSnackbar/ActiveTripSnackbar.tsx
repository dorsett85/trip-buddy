import React, { memo } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useActiveTrip } from '../../store/hooks/useTrip';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { setDrawer } from '../../store/general/actions';
import { setActiveTripInfo } from '../../store/trip/actions';
import { useAppSelector } from '../../store/hooks/useAppSelector';

const ActiveTripSnackbar = () => {
  const dispatch = useAppDispatch();
  const activeTrip = useActiveTrip();
  const updatingLocation = useAppSelector(
    ({ trip }) => !!trip.activeTripInfo && trip.activeTripInfo.updatingLocation
  );
  const creatingItinerary = useAppSelector(({ trip }) => !!trip.itineraryCreator);
  const updatingItineraryLocation = useAppSelector(
    ({ trip }) =>
      !!trip.activeTripInfo &&
      trip.activeTripInfo.updatingItineraryLocationId !== undefined
  );
  const openDrawer = useAppSelector(({ general }) => general.drawer.open);

  // Never show the snackbar if there's no activeTrip
  if (!activeTrip) {
    return null;
  }

  const handleClose = () => {
    dispatch(setDrawer({ open: true }));
    dispatch(
      setActiveTripInfo({
        updatingLocation: false,
        updatingItineraryLocationId: undefined
      })
    );
  };

  const action = (updatingLocation || creatingItinerary || updatingItineraryLocation) && (
    <IconButton onClick={handleClose} key='close' aria-label='close' color='inherit'>
      <CloseIcon />
    </IconButton>
  );

  const message = updatingLocation
    ? 'Select a location for your trip'
    : creatingItinerary || updatingItineraryLocation
    ? 'Select a location for your itinerary'
    : `"${activeTrip.name}" trip is active, click the marker to view details or click the map to close...`;

  return <Snackbar open={!openDrawer} message={message} action={action} />;
};

export default memo(ActiveTripSnackbar);
