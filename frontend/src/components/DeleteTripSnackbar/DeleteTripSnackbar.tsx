import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { AppState } from '../../store';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { setActiveTripInfo, setTripItineraries } from '../../store/trip/actions';
import { useActiveTrip, useActiveTripId } from '../../utils/hooks/useTrip';

const DeleteTripSnackbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const deletedTripId = useActiveTripId();
  const activeTrip = useActiveTrip();
  const openDrawer = useSelector((state: AppState) => !!state.general.drawer);

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
