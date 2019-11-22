import React, { memo } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';
import { TripLeg } from '../../types/trip';
import { setOpenDrawer } from '../../store/general/actions';

const TripDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const activeTrip = useSelector(({ trip }: AppState) => trip.activeTrip);
  const open = useSelector(({ general }: AppState) => general.openDrawer);

  const handleClose = () => {
    dispatch(setOpenDrawer(false));
  };

  // Content to display within the Drawer
  const content =
    activeTrip &&
    activeTrip.legs.map(leg => (
      <div key={leg.id}>
        <p>{leg.name}</p>
        {Object.keys(leg).map(key => (
          <div key={key}>
            <span>
              <b>{key}</b>: {leg[key as keyof TripLeg]}
            </span>
          </div>
        ))}
      </div>
    ));

  return (
    <Drawer open={open} anchor='right' onClose={handleClose}>
      {content}
    </Drawer>
  );
};

export default memo(TripDrawer);
