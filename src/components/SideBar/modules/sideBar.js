export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR
  }
}

const initialState = {
  isOpen: true
}

export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {...state, isOpen: !state.isOpen}
  }
  return state
}
