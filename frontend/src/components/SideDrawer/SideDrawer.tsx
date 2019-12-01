import React from 'react';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppState } from '../../store';
import { setOpenDrawer } from '../../store/general/actions';
import { setViewInfo } from '../../store/user/actions';
import UserContent from './UserContent';
import TripContent from './TripContent';

export interface SideDrawerProps extends DrawerProps {
  onClose: () => void;
}

const DrawerContentContainer = styled.div`
  margin: 1rem;
  & > button {
    margin-bottom: 0.5rem;
  }
  .drawerContentContainer-content {
    padding-top: 0.5rem;
  }
`;

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
      <div className='drawerContentContainer-content'>{children}</div>
    </DrawerContentContainer>
  </Drawer>
);

const SideDrawerContainer: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);
  const activeTrip = useSelector(({ trip }: AppState) => trip.activeTrip);
  const open = useSelector(({ general }: AppState) => general.openDrawer);

  const openTripDrawer = open && !user.viewInfo;
  const openUserDrawer = open && !!user.viewInfo;

  const handleClose = () => {
    dispatch(setOpenDrawer(false));

    // Unset the user info viewing state anytime the drawer closes
    if (user.viewInfo) {
      dispatch(setViewInfo(false));
    }
  };

  return (
    <>
      <SideDrawer open={openTripDrawer} onClose={handleClose}>
        {activeTrip && <TripContent dispatch={dispatch} trip={activeTrip} />}
      </SideDrawer>
      <SideDrawer open={openUserDrawer} onClose={handleClose}>
        <UserContent dispatch={dispatch} user={user} />
      </SideDrawer>
    </>
  );
};

export default SideDrawerContainer;
