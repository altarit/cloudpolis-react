import * as types from './authConstants'

const initialState = {}

const ACTION_HANDLERS = {
  [types.AUTH_RESET_STATUS]: (state, action) => {
    return {name: state.name}
  },
  [types.AUTH_HI_REQUEST]: (state, action) => {
    return {...state}
  },
  [types.AUTH_HI_SUCCESS]: (state, action) => {
    return {...state}
  },
  [types.AUTH_HI_FAILURE]: (state, action) => {
    return {...state}
  },
  [types.AUTH_LOGIN_REQUEST]: (state, action) => {
    return {...state, fetching: true}
  },
  [types.AUTH_LOGIN_SUCCESS]: (state, action) => {
    return {...state, fetching: false, name: action.name}
  },
  [types.AUTH_LOGIN_FAILURE]: (state, action) => {
    return {...state, fetching: false, errorText: action.errorText}
  },
  [types.AUTH_SIGNUP_REQUEST]: (state, action) => {
    return {...state, fetching: true}
  },
  [types.AUTH_SIGNUP_SUCCESS]: (state, action) => {
    return {...state, fetching: false, name: action.name}
  },
  [types.AUTH_SIGNUP_FAILURE]: (state, action) => {
    return {...state, fetching: false, errorText: action.errorText}
  },
  [types.AUTH_LOGOUT_REQUEST]: (state, action) => {
    return {...state, fetching: true}
  },
  [types.AUTH_LOGOUT_SUCCESS]: (state, action) => {
    return {...state, fetching: false, name: undefined}
  },
  [types.AUTH_LOGOUT_FAILURE]: (state, action) => {
    return {...state, fetching: false, errorText: action.errorText}
  },
  [types.AUTH_SET_USER]: (state, action) => {
    return {...state, name: action.name}
  }
}

export default function authReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
