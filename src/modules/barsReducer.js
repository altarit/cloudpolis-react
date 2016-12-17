export const TOOGLE_SIDEBAR = 'TOOGLE_SIDEBAR';

export function toogleSidebar(isOpen = false) {
  return {
    type: TOOGLE_SIDEBAR,
    isOpen: !isOpen
  }
}

export const actions = {
  toogleSidebar
};


const initialState = false;
export default function barsReducer(state = initialState, action) {
  switch (action.type) {
    case TOOGLE_SIDEBAR:
      return !state;
    default:
      return state;
  }
}




