import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { ApolloProvider } from '@apollo/react-hooks';
import store from '../../store';
import { theme } from '../../styles/theme';
import { generateApolloClient } from '../../api/apollo/apolloClient';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { useUserLoggedIn } from '../../store/hooks/useUser';
import { setSubscriptionConnected } from '../../store/user/reducer';

const GraphqlProvider: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const loggedIn = useUserLoggedIn();
  const [client, setClient] = useState(generateApolloClient(false)[0]);

  useEffect(() => {
    if (loggedIn) {
      const [apolloClient, subscriptionClient] = generateApolloClient(loggedIn);
      subscriptionClient.onConnected(() => {
        dispatch(setSubscriptionConnected(true));
      })
      setClient(apolloClient);
    }
  }, [dispatch, loggedIn]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

const AppProviders: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <GraphqlProvider>{children}</GraphqlProvider>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </StylesProvider>
    </Provider>
  );
};

export default AppProviders;
