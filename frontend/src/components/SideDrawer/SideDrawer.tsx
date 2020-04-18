import React from 'react';
import { Drawer, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styled, { css } from 'styled-components';
import { setDrawer } from '../../store/general/reducer';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { setTripItineraryCreator } from '../../store/trip/reducer';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import SideDrawerContent from "./SideDrawerContent";

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

const SideDrawerContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const creatingItinerary = useAppSelector(({ trip }) => !!trip.itineraryCreator);
  const open = useAppSelector(({ general }) => general.drawer.open);

  const handleClose = () => {
    dispatch(setDrawer({ open: false }));

    // Unset the creating itinerary state
    if (creatingItinerary) {
      dispatch(setTripItineraryCreator());
    }
  };

  return (
    <Drawer open={open} anchor='right' onClose={handleClose}>
      <DrawerContentContainer>
        <Button
          variant='contained'
          color='default'
          size='small'
          onClick={handleClose}
          aria-label='close-drawer'
        >
          <CloseIcon />
        </Button>
        <hr />
        <DrawerContent>
          <SideDrawerContent />
        </DrawerContent>
      </DrawerContentContainer>
    </Drawer>
  );
};

export default SideDrawerContainer;
