import React from 'react';
import { Provider } from 'react-redux';
import ApolloProvider from './ApolloProvider/ApolloProvider';
import TripMapLazy from './TripMap/TripMapLazy';
import CheckLoggedIn from './CheckLoggedIn/CheckLoggedIn';
import store from '../store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ApolloProvider>
        <TripMapLazy />
        <CheckLoggedIn />
      </ApolloProvider>
    </Provider>
  );
};

export default App;
