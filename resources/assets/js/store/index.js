import 'babel-polyfill';

// With React

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import { Router, Route, IndexRoute, hashHistory, Match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import rootReducer from '../redux/Reducers';
import SlideChangeContainer from '../container/SlideChangeContainer';
import SelectSeatContainer from '../container/SelectSeatContainer';
import SlideNumber from '../component/SlideNumber';
import DummySection from '../component/DummySection';
import SelectSeat from '../component/SelectSeat';
import SeatComponent from '../component/SeatComponent';
import Home from '../component/Home';

const middlewares = [thunk];

const logger = createLogger();
if (window.location.hostname == 'localhost') {
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Home}>
        <IndexRoute randomText="haha" component={DummySection}/>
        <Route path="slides" component={SlideChangeContainer}/>
        <Route path="slides/adv" randomText="hehe" component={DummySection}/>
        <Route path="seats" component={SelectSeatContainer}>
          <Route path="seat/:id" component={SeatComponent} />
        </Route>
        <Route path="*" randomText="gak kemana2 kaks" component={DummySection}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('body-slide')
);
