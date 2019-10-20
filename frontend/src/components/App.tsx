import React from 'react';
import TripMapLazy from './TripMap/TripMapLazy';
import CheckLoggedIn from './CheckLoggedIn/CheckLoggedIn';

const App: React.FC = () => {
  return (
    <>
      <TripMapLazy />
      <CheckLoggedIn />
    </>
  );
};

export default App;
