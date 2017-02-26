export const POPUP_CLOSE_ALL = 'POPUP_CLOSE_ALL'
export const POPUP_OPEN = 'POPUP_OPEN'

export function closeAllPopups() {
  return {
    type: POPUP_CLOSE_ALL
  }
}

export function openPopup(name, from, x, y, rx, ry) {
  return {
    type: POPUP_OPEN,
    name,
    from,
    x,
    y,
    rx,
    ry
  }
}

const initialState = {}
export default function popupReducer(state = initialState, action) {
  switch (action.type) {
    case POPUP_CLOSE_ALL:
      return initialState
    case POPUP_OPEN:
      if (state[action.name] && !action.from) return initialState
      return {
        [action.name]: !state[action.name] || state[action.name].from !== action.from
          ? {open: true, from: action.from, x: action.x, y: action.y, rx: action.rx, ry: action.ry}
          : null
      }
  }
  return state
}
