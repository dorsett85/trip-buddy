import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from './store';
import App from './components/App';

const Root = () => (
  <Provider store={store}>
    <CssBaseline>
      <App />
    </CssBaseline>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
