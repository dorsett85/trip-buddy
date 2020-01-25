import React, { memo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import EventIcon from '@material-ui/icons/Event';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { setDrawer } from '../../store/general/reducer';
import { setTripCreator } from '../../store/trip/reducer';

const ViewTripButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    // Make sure to cancel other map location actions
    dispatch(setTripCreator());
    dispatch(setDrawer({ open: true, content: 'trip' }));
  };

  return (
    <IconButton onClick={handleClick} color='inherit' title='View Trips' aria-label='view trips'>
      <EventIcon />
    </IconButton>
  );
};

export default memo(ViewTripButton);
