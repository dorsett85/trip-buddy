import styled, { css } from 'styled-components';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import React from 'react';

const StyledIconButton = styled(IconButton)(
  ({ theme }) => css`
    color: ${theme.colors.primary};
  `
);

const FlyToButton: React.FC<IconButtonProps> = props => {
  return (
    <StyledIconButton
      {...props}
      color='inherit'
      title='Go to map location'
      aria-label='Go to map location'
    >
      <GpsFixedIcon />
    </StyledIconButton>
  );
};

export default FlyToButton;
