import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './components/App';

const root = (
  <CssBaseline>
    <App />
  </CssBaseline>
)

ReactDOM.render(root, document.getElementById('root'));
