import * as ActionTypes from '../constants/ActionTypes';

// Action creators
function nextSlide() {
  FirebaseObjects.database.ref('slide').set({
    action: 'baru aja di next slide'
  });
  return { type: ActionTypes.NEXT_SLIDE };
}

function prevSlide() {
  FirebaseObjects.database.ref('slide').set({
    action: 'baru aja di prev slide'
  });
  return { type: ActionTypes.PREV_SLIDE };
}

function changeSeat(num) {
  return {
    type: ActionTypes.CHANGE_SEAT,
    nextSeatID: num
  };
}

export { nextSlide, prevSlide, changeSeat };
