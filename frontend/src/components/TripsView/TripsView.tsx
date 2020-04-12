import React, { memo } from 'react';
import Fab from '@material-ui/core/Fab';
import styled, { css } from 'styled-components';
import { setTripCreator } from '../../store/trip/reducer';
import { setDrawer } from '../../store/general/reducer';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import TripsViewTabLayout from '../TripsViewTabLayout/TripsViewTabLayout';

const Header = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing()};
  `
);

const TripsView: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleCreateTripClick = () => {
    dispatch(setDrawer({ open: false, content: undefined }));
    dispatch(setTripCreator({ openModal: true }));
  };

  return (
    <div>
      <Header>
        <h2>View Trips</h2>
        <Fab color='primary' variant='extended' onClick={handleCreateTripClick}>
          Create New Trip
        </Fab>
      </Header>
      <TripsViewTabLayout />
    </div>
  );
};

export default memo(TripsView);
