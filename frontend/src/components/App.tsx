import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { hot } from 'react-hot-loader/root';
import ApolloProvider from './ApolloProvider/ApolloProvider';
import CheckLoggedIn from './CheckLoggedIn/CheckLoggedIn';
import store from '../store';
import { theme } from '../styles/theme';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <ApolloProvider>
            <CheckLoggedIn />
          </ApolloProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default hot(App);
