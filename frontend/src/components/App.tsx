import React from 'react';
import TripMapLazyLoad from './TripMap/TripMapLazyLoad';
import CheckLoggedIn from './CheckLoggedIn/CheckLoggedIn';

const App: React.FC = () => {
  return (
    <>
      <TripMapLazyLoad />
      <CheckLoggedIn />
    </>
  );
};

export default App;
