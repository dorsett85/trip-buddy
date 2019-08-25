import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TripMap from './TripMap/TripMap';

const App: React.FC = () => {
  return (
    <CssBaseline>
      <TripMap />
    </CssBaseline>
  );
};

export default App;
