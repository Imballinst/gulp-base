import { combineReducers } from 'redux'
import { PREV_SLIDE, NEXT_SLIDE } from './actions'

const MIN_SLIDE = 1;
const MAX_SLIDE = 15;

const initialState = {
  num: 1
}

function slideAction(state = initialState, action) {
  switch (action.type) {
    case NEXT_SLIDE:
      if (state.num < MAX_SLIDE) {
        return Object.assign({}, state, {
          num: state["num"] + 1
        })
      }
      else {
        return state;
      }
      break;
    case PREV_SLIDE:
      if (state.num > MIN_SLIDE) {
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

const slideApp = combineReducers({
  slideAction
})

export default slideApp