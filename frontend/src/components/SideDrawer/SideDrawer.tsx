import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppState } from '../../store';
import { setOpenDrawer } from '../../store/general/actions';
import { setViewProfile, setViewAccount } from '../../store/user/actions';
import UserContent from './UserContent';
import TripContent from './TripContent';

const DrawerContentContainer = styled.div`
  margin: 1rem;
`;

const SideDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);
  const activeTrip = useSelector(({ trip }: AppState) => trip.activeTrip);
  const open = useSelector(({ general }: AppState) => general.openDrawer);

  const viewUserInfo = user.viewAccount || user.viewProfile;

  const openTripDrawer = open && !viewUserInfo;
  const openUserDrawer = open && viewUserInfo;

  const tripContent = activeTrip && <TripContent dispatch={dispatch} trip={activeTrip} />;
  const userContent = viewUserInfo && <UserContent dispatch={dispatch} user={user} />;

  const handleClose = () => {
    dispatch(setOpenDrawer(false));

    // Unset the user info viewing state anytime the drawer closes
    if (viewUserInfo) {
      dispatch(setViewProfile(false));
      dispatch(setViewAccount(false));
    }
  };

  return (
    <>
      <Drawer open={openTripDrawer} anchor='right' onClose={handleClose}>
        <DrawerContentContainer>{tripContent}</DrawerContentContainer>
      </Drawer>
      <Drawer open={openUserDrawer} anchor='right' onClose={handleClose}>
        <DrawerContentContainer>{userContent}</DrawerContentContainer>
      </Drawer>
    </>
  );
};

export default SideDrawer;
