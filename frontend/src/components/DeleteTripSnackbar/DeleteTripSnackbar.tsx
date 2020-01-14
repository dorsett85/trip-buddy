import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { AppState } from '../../store';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { setActiveTrip } from '../../store/trip/actions';
import { useActiveTrip } from '../../utils/hooks/useActiveTrip';

const DeleteTripSnackbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const deletedTripId = useSelector(
    (state: AppState) => state.trip.activeTrip && state.trip.activeTrip.id
  );
  const activeTrip = useActiveTrip();
  const openDrawer = useSelector((state: AppState) => state.general.openDrawer);

  const handleClose = () => {
    dispatch(setActiveTrip());
  };

  const open = !!deletedTripId && !activeTrip  && !openDrawer;
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
