import React, { memo } from 'react';
import Slide from '@material-ui/core/Slide';
import styled, { css } from 'styled-components';
import UserDropdown from './UserDropdown';
import CreateTripButton from './CreateTripButton';
import ViewTripsButton from './ViewTripsButton';
import { useUserData } from '../../store/hooks/useUser';

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

const Navigator: React.FC = () => {
  const userData = useUserData();

  return (
    <Slide in={!!userData} direction='down'>
      <AppBar>
        <TitleText>Trip Buddy</TitleText>
        <CreateTripButton color='inherit' />
        <ViewTripsButton />
        {userData && <UserDropdown user={userData} />}
      </AppBar>
    </Slide>
  );
};

export default memo(Navigator);
