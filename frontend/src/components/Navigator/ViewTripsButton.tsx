import React, { memo } from 'react';
import { IconButton, Badge } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { setDrawer } from '../../store/general/reducer';
import { setTripCreator } from '../../store/trip/reducer';
import { useAppSelector } from '../../store/hooks/useAppSelector';

const ViewTripButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const notificationCount = useAppSelector(
    ({ trip }) => trip.notifications.tripInvites.length
  );

  const handleClick = () => {
    // Make sure to cancel other map location actions
    dispatch(setTripCreator());
    dispatch(setDrawer({ open: true, content: 'trip' }));
  };

  return (
    <IconButton
      onClick={handleClick}
      color='inherit'
      title='View Trips'
      aria-label='view trips'
    >
      <Badge badgeContent={notificationCount} color='secondary'>
        <EventIcon />
      </Badge>
    </IconButton>
  );
};

export default memo(ViewTripButton);
