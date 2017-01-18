export const USELESS_ACTION = 'USELESS_ACTION';
export const TOOGLE_SIDEBAR = 'TOOGLE_SIDEBAR';


export function toggleSidebar() {
  return {
    type: TOOGLE_SIDEBAR
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
  isOpen: true
}

export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    //case USELESS_ACTION:
    //  return {...state, isOpen: action.payload}
    case TOOGLE_SIDEBAR:
      return {...state, isOpen: !state.isOpen}
  }
  return state
}
