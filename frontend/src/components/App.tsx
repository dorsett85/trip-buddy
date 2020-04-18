import React from 'react';
import { hot } from 'react-hot-loader/root';
import CheckLoggedIn from './CheckLoggedIn/CheckLoggedIn';
import TripMapLazy from './TripMap/TripMapLazy';
import SideDrawerLazy from './SideDrawer/SideDrawerLazy';
import TripNotifications from './TripNotifications/TripNotifications';
import LandingModal from './LandingModal/LandingModal';
import Navigator from './Navigator/Navigator';
import AppProviders from './AppProviders/AppProviders';

const App: React.FC = () => {
  return (
    <AppProviders>
      <CheckLoggedIn />
      <Navigator />
      <LandingModal />
      <TripNotifications />
      <TripMapLazy />
      <SideDrawerLazy />
    </AppProviders>
  );
};

export default hot(App);
