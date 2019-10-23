import React from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import ApolloProvider from './ApolloProvider/ApolloProvider';
import TripMapLazy from './TripMap/TripMapLazy';
import CheckLoggedIn from './CheckLoggedIn/CheckLoggedIn';
import store from '../store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ApolloProvider>
        <CssBaseline>
          <TripMapLazy />
          <CheckLoggedIn />
        </CssBaseline>
      </ApolloProvider>
    </Provider>
  );
};

export default App;
