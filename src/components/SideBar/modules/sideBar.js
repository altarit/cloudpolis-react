export const USELESS_ACTION = 'USELESS_ACTION';
export const TOOGLE_SIDEBAR = 'TOOGLE_SIDEBAR';
export const SCROLL_LEFT = 'SCROLL_LEFT'
export const SCROLL_RIGHT = 'SCROLL_RIGHT'

export function toggleSidebar() {
  return {
    type: TOOGLE_SIDEBAR
  }
}

export function scrollLeft() {
  return {
    type: SCROLL_LEFT
  }
}

export function scrollRight() {
  return {
    type: SCROLL_RIGHT
  }
}

export function doNothing(what = 'nothing') {
  return {
    type: USELESS_ACTION,
    payload: what
  };
}

export const actions = {
  doNothing,
  toggleSidebar
};


const initialState = {
  isOpen: true,
  scrolledTabs: 0
}

export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    //case USELESS_ACTION:
    //  return {...state, isOpen: action.payload}
    case TOOGLE_SIDEBAR:
      return {...state, isOpen: !state.isOpen}
    case SCROLL_LEFT:
      return {...state, scrolledTabs: state.scrolledTabs > 0 ? state.scrolledTabs - 1: state.scrolledTabs}
    case SCROLL_RIGHT:
      return {...state, scrolledTabs: state.scrolledTabs + 1}
  }
  return state
}
