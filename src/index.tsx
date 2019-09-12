import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import ApolloProvider from './apollo/Provider';
import store from './store';
import App from './components/App';

const Root = () => (
  <Provider store={store}>
    <ApolloProvider>
      <CssBaseline>
        <App />
      </CssBaseline>
    </ApolloProvider>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
