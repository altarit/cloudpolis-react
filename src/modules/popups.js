export const POPUP_CLOSE_ALL = 'POPUP_CLOSE_ALL'
export const POPUP_OPEN = 'POPUP_OPEN'

export function closeAllPopups() {
  return {
    type: POPUP_CLOSE_ALL
  }
}

export function openPopup(name, x, y) {
  return {
    type: POPUP_OPEN,
    popup: name,
    x,
    y
  }
}

const initialState = {}
export default function popupReducer(state = initialState, action) {
  switch (action.type) {
    case POPUP_CLOSE_ALL:
      return initialState
    case POPUP_OPEN:
      if (state[action.popup] && !action.x && !action.y) return initialState
      return {initialState, [action.popup]: { open: true, x: action.x, y: action.y}}
  }
  return state
}
