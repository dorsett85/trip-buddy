import React from 'react';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import styled, { css } from 'styled-components';
import { setDrawer } from '../../store/general/reducer';
import UserContent from '../UserContent/UserContent';
import TripContent from '../TripContent/TripContent';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { setTripItineraryCreator } from '../../store/trip/reducer';
import { useAppSelector } from '../../store/hooks/useAppSelector';

export interface SideDrawerProps extends DrawerProps {
  onClose: () => void;
}

const DrawerContent = styled.div``;
const DrawerContentContainer = styled.div(
  ({ theme }) => css`
    width: 100vw;
    ${theme.breakpoints.up('sm')} {
      width: 450px;
    }
    padding: 1rem;
    > button {
      margin-bottom: 0.5rem;
    }
    ${DrawerContent} {
      padding-top: 0.5rem;
    }
  `
);

const SideDrawer: React.FC<SideDrawerProps> = ({ open, onClose, children }) => (
  <Drawer open={open} anchor='right' onClose={onClose}>
    <DrawerContentContainer>
      <Button
        variant='contained'
        color='default'
        size='small'
        onClick={onClose}
        aria-label='close-drawer'
      >
        <CloseIcon />
      </Button>
      <hr />
      <DrawerContent>{children}</DrawerContent>
    </DrawerContentContainer>
  </Drawer>
);

const SideDrawerContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const creatingItinerary = useAppSelector(({ trip }) => !!trip.itineraryCreator);
  const drawer = useAppSelector(({ general }) => general.drawer);

  const handleClose = () => {
    dispatch(setDrawer({ open: false }));

    // Unset the creating itinerary state
    if (creatingItinerary) {
      dispatch(setTripItineraryCreator());
    }
  };

  const content =
    drawer.content === 'trip' ? (
      <TripContent dispatch={dispatch} />
    ) : drawer.content === 'user' && user.data ? (
      <UserContent dispatch={dispatch} user={user.data} />
    ) : null;

  return (
    <SideDrawer open={drawer.open} onClose={handleClose}>
      {content}
    </SideDrawer>
  );
};

export default SideDrawerContainer;
