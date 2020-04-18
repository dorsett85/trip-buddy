import React from 'react';
import { Provider } from 'react-redux';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { ApolloProvider } from '@apollo/react-hooks';
import store from '../../store';
import { theme } from '../../styles/theme';
import { client } from '../../api/apollo/apolloClient';

const AppProviders: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <ApolloProvider client={client}>{children}</ApolloProvider>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </StylesProvider>
    </Provider>
  );
};

export default AppProviders;
