export const USELESS_ACTION = 'USELESS_ACTION';

export function doNothing(what = 'nothing') {
  return {
    type: USELESS_ACTION,
    payload: what
  };
}

export const actions = {
  doNothing
};


const initialState = '';
export default function sideBarReducer(state = initialState, action) {
  switch (action.type) {
    case USELESS_ACTION:
      return action.payload;
    default:
      return state;
  }
}
