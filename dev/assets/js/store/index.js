import 'babel-polyfill';

// With React

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../redux/Reducers';
import App from '../container/App';

const middlewares = [thunk];

const logger = createLogger();
if (window.location.hostname == 'localhost') {
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('body-slide')
);
