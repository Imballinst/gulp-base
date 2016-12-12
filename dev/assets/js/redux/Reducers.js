import { combineReducers } from 'redux';
import * as ActionTypes from '../constants/ActionTypes';
import * as Slides from '../constants/Slides';

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
  changeSlideState
});

export default rootReducer;
