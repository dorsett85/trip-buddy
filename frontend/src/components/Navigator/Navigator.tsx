import React, { memo } from 'react';
import Slide from '@material-ui/core/Slide';
import styled, { css } from 'styled-components';
import { ShowProps } from '../../types/componentProps';
import UserDropdown from './UserDropdown';
import CreateTripButton from './CreateTripButton';
import ViewTripsButton from './ViewTripsButton';

const AppBar = styled.header(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    position: fixed;
    padding: 0 ${theme.spacing('md')};
    width: 100%;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    z-index: 1;
  `
);

const TitleText = styled.h2`
  flex-grow: 1;
`;

const Navigator: React.FC<ShowProps> = ({ show }) => {
  return (
    <Slide in={show} direction='down'>
      <AppBar>
        <TitleText>Trip Buddy</TitleText>
        <CreateTripButton color='inherit' />
        <ViewTripsButton />
        {show && <UserDropdown />}
      </AppBar>
    </Slide>
  );
};

export default memo(Navigator);
