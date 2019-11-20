import React, { memo } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';
import { setActiveTrip } from '../../store/trip/actions';
import { ActiveTrip } from '../../store/trip/types';

const TripDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const activeTrip = useSelector(({ trip }: AppState) => trip.activeTrip);

  const handleClose = () => {
    if (activeTrip) {
      dispatch(setActiveTrip({ ...activeTrip, openDrawer: false }));
    }
  };

  const open = activeTrip && activeTrip.openDrawer;

  // Content to display within the Drawer
  const content = activeTrip && (
    <ul>
      {Object.keys(activeTrip).map(key => (
        <li>
          <b>{key}</b>: {activeTrip[key as keyof ActiveTrip]}
        </li>
      ))}
    </ul>
  );

  return (
    <Drawer open={open} anchor='right' onClose={handleClose}>
      {content}
    </Drawer>
  );
};

export default memo(TripDrawer);
