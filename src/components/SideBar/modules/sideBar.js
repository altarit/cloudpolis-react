export const TOOGLE_SIDEBAR = 'TOOGLE_SIDEBAR'

export function toggleSidebar () {
  return {
    type: TOOGLE_SIDEBAR
  }
}

export const actions = {
  toggleSidebar
}

const initialState = {
  isOpen: true
}

export default function sidebarReducer (state = initialState, action) {
  switch (action.type) {
    case TOOGLE_SIDEBAR:
      return { ...state, isOpen: !state.isOpen }
  }
  return state
}
