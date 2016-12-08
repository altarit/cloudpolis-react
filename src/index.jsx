console.log('loaded');

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import state from './store/createStore';



ReactDOM.render(
  <App store={state}/>,
  document.getElementById('app')
);
