import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import InputAdornment from '@material-ui/core/InputAdornment';

export interface LocationInputAdornmentProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const LocationInputAdornment: React.FC<LocationInputAdornmentProps> = ({ onClick }) => {
  return (
    <InputAdornment title='Choose location on map' position='start'>
      <IconButton aria-label='Choose location on map' onClick={onClick}>
        <EditLocationIcon />
      </IconButton>
    </InputAdornment>
  );
};

export default LocationInputAdornment;
