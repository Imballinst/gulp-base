import { combineReducers } from 'redux';
import { routerReducer, LOCATION_CHANGE } from 'react-router-redux'

import * as ActionTypes from '../constants/ActionTypes';
import * as Slides from '../constants/Slides';
import Seats from '../constants/Seats';

const initialSeatState = {
  currentSeatID: 1,
  currentSeatName: "first class seat",
  currentSeatText: "lel kek xD"
};

function changeSeatState(state = initialSeatState, action) {
  switch (action.type) {
    case LOCATION_CHANGE: {
      const pattern = /\/seats\/seat\/[0-9]+/g;
      console.log('a');
      if (action.payload.pathname.match(pattern)) {
        console.log('b');
        const seatID = parseInt(action.payload.pathname.split('/', 4)[3]);

        const nextSeat = Seats.find(function (seat) {
          return seatID === seat.id;
        });

        return Object.assign({}, state, {
          currentSeatID: nextSeat.id,
          currentSeatName: nextSeat.name,
          currentSeatText: nextSeat.text
        });
      } else {
        return state;
      }
    }
    case ActionTypes.CHANGE_SEAT: {
      if (state.currentSeatID !== action.nextSeatID) {
        const nextSeat = Seats.find(function (seat) {
          return action.nextSeatID === seat.id;
        });

        return Object.assign({}, state, {
          currentSeatID: nextSeat.id,
          currentSeatName: nextSeat.name,
          currentSeatText: nextSeat.text
        });
      } else {
        return state;
      }
    }
    default: {
      return state;
    }
  }
}

const initialState = {
  num: 1
};

function changeSlideState(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.NEXT_SLIDE:
      if (state.num < Slides.MAX_SLIDE) {
        return Object.assign({}, state, {
          num: state["num"] + 1
        })
      }
      else {
        return state;
      }
      break;
    case ActionTypes.PREV_SLIDE:
      if (state.num > Slides.MIN_SLIDE) {
        return Object.assign({}, state, {
          num: state["num"] - 1
        })
      }
      else {
        return state;
      }
      break;
    default:
      return state
  }
}

const rootReducer = combineReducers({
  changeSlideState,
  changeSeatState,
  routing: routerReducer
});

export default rootReducer;
