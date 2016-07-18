// Action types

export const NEXT_SLIDE = 'NEXT_SLIDE';
export const PREV_SLIDE = 'PREV_SLIDE';

// Action creators

export function nextSlide() {
  return { type: NEXT_SLIDE }
}

export function prevSlide() {
  return { type: PREV_SLIDE }
}