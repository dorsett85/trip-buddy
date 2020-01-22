import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PinDropIcon from '@material-ui/icons/PinDrop';
import InputAdornment from '@material-ui/core/InputAdornment';

export interface LocationInputAdornmentProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const LocationInputAdornment: React.FC<LocationInputAdornmentProps> = ({ onClick }) => {
  return (
    <InputAdornment title='Choose location on map' position='start'>
      <IconButton aria-label='Choose location on map' onClick={onClick}>
        <PinDropIcon />
      </IconButton>
    </InputAdornment>
  );
};

export default LocationInputAdornment;
