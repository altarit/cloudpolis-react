export const POPUP_CLOSE_ALL = 'POPUP_CLOSE_ALL'
export const POPUP_OPEN = 'POPUP_OPEN'
export const POPUP_ASK_CONFIRMATION = 'POPUP_OPEN_CONFIRMATION'
export const POPUP_OPEN_SINGLE_INPUT = 'POPUP_OPEN_SINGLE_INPUT'

export const CONFIRMATION_POPUP_NAME = 'confirmationPopup'
export const SINGLE_INPUT_POPUP_NAME = 'singleInputPopup'

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

export function openConfirmation(title, confirmText = 'Yes', rejectText = 'Cancel', action) {
  return {
    type: POPUP_ASK_CONFIRMATION,
    title,
    confirmText,
    rejectText,
    action
  }
}

export function openSingleInput(title, confirmText = 'Yes', defaultValue, errorText, action) {
  return {
    type: POPUP_OPEN_SINGLE_INPUT,
    title,
    confirmText,
    defaultValue,
    errorText,
    action
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
    case POPUP_ASK_CONFIRMATION:
      return {
        ...state,
        [CONFIRMATION_POPUP_NAME]: {
          open: true,
          title: action.title,
          confirmText: action.confirmText,
          rejectText: action.rejectText,
          action: action.action
        },
        shade: true
      }
    case POPUP_OPEN_SINGLE_INPUT:
      return {
        ...state,
        [SINGLE_INPUT_POPUP_NAME]: {
          open: true,
          title: action.title,
          confirmText: action.confirmText,
          defaultValue: action.defaultValue,
          errorText: action.errorText,
          action: action.action
        },
        shade: true
      }
  }
  return state
}
