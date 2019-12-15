import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import ApolloProvider from './ApolloProvider/ApolloProvider';
import CheckLoggedIn from './CheckLoggedIn/CheckLoggedIn';
import store from '../store';
import { theme } from '../styles/theme';
import { Col, Row } from '../styles/grid';
import { Card, CardContent } from '@material-ui/core';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <ApolloProvider>
            {/* <Row gutter='lg'> */}

              <Col width={3} offset={3}>
                <Card>
                  <CardContent>Col</CardContent>
                </Card>
              </Col>
              <Col width={3} offset={3}>
                <Card>
                  <CardContent>Col</CardContent>
                </Card>
              </Col>
              <Col width={3} offset={3}>
                <Card>
                  <CardContent>Col</CardContent>
                </Card>
              </Col>
            {/* </Row> */}
            {/* <CheckLoggedIn /> */}
          </ApolloProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
