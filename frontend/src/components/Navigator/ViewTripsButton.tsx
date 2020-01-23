import React, { memo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MapIcon from '@material-ui/icons/Map';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { setDrawer } from '../../store/general/reducer';

const ViewTripButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setDrawer({ open: true, content: 'trip' }));
  };

  return (
    <IconButton onClick={handleClick} color='inherit' aria-label='view trips'>
      <MapIcon />
    </IconButton>
  );
};

export default memo(ViewTripButton);
