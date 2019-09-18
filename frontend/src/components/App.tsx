import React from 'react';
import TripMapLazyLoad from './TripMap/TripMapLazyLoad';
import LandingModal from './LandingModal/LandingModal';

const App: React.FC = () => {
  return (
    <>
      <TripMapLazyLoad />
      <LandingModal />
    </>
  );
};

export default App;
