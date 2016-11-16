import * as ActionTypes from '../constants/ActionTypes';

// Action creators

function nextSlide() {
  return { type: ActionTypes.NEXT_SLIDE };
}

function prevSlide() {
  return { type: ActionTypes.PREV_SLIDE };
}

export { nextSlide, prevSlide };
