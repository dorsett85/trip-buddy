import React, { memo } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { setActiveTripInfo, setTripItineraries } from '../../store/trip/reducer';
import { useActiveTrip, useActiveTripId } from '../../store/hooks/useTrip';
import { useAppSelector } from '../../store/hooks/useAppSelector';

const DeleteTripSnackbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const deletedTripId = useActiveTripId();
  const activeTrip = useActiveTrip();
  const openDrawer = useAppSelector(({ general }) => general.drawer.open);

  const handleClose = () => {
    dispatch(setActiveTripInfo());
    dispatch(setTripItineraries());
  };

  const open = !!deletedTripId && !activeTrip && !openDrawer;
  const message = `Trip successfully deleted!`;

  return (
    <Snackbar
      open={open}
      message={message}
      autoHideDuration={5000}
      onClose={handleClose}
    />
  );
};

export default memo(DeleteTripSnackbar);
