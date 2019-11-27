import React from 'react';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppState } from '../../store';
import { setOpenDrawer } from '../../store/general/actions';
import { setViewProfile, setViewAccount } from '../../store/user/actions';
import UserContent from './UserContent';
import TripContent from './TripContent';

export interface SideDrawerProps extends DrawerProps {
  onClose: () => void;
  content: JSX.Element | false;
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

const SideDrawer: React.FC<SideDrawerProps> = ({ open, onClose, content }) => (
  <Drawer open={open} anchor='right' onClose={onClose}>
    <DrawerContentContainer>
      <Button variant='contained' color='default' size='small' onClick={onClose}>
        <CloseIcon />
      </Button>
      <hr />
      <div className='drawerContentContainer-content'>{content}</div>
    </DrawerContentContainer>
  </Drawer>
);

const SideDrawerContainer: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);
  const activeTrip = useSelector(({ trip }: AppState) => trip.activeTrip);
  const open = useSelector(({ general }: AppState) => general.openDrawer);

  const viewUserInfo = user.viewAccount || user.viewProfile;

  const openTripDrawer = open && !viewUserInfo;
  const openUserDrawer = open && viewUserInfo;

  const tripContent = !!activeTrip && (
    <TripContent dispatch={dispatch} trip={activeTrip} />
  );
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
      <SideDrawer open={openTripDrawer} onClose={handleClose} content={tripContent} />
      <SideDrawer open={openUserDrawer} onClose={handleClose} content={userContent} />
    </>
  );
};

export default SideDrawerContainer;
