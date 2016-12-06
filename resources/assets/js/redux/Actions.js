import * as ActionTypes from '../constants/ActionTypes';

// Action creators

function nextSlide() {
  return { type: ActionTypes.NEXT_SLIDE };
}

function prevSlide() {
  return { type: ActionTypes.PREV_SLIDE };
}

function changeSeat(num) {
  return {
    type: ActionTypes.CHANGE_SEAT,
    nextSeatID: num
  };
}

export { nextSlide, prevSlide, changeSeat };
