import * as types from './authConstants'

const initialState = {}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.AUTH_HI_REQUEST:
      return {...state}
    case types.AUTH_HI_SUCCESS:
      return {...state, name: action.name}
    case types.AUTH_HI_FAILURE:
      return {...state, fetching: false}
    case types.AUTH_LOGIN_REQUEST:
      return {...state, fetching: true}
    case types.AUTH_LOGIN_SUCCESS:
      return {...state, fetching: false, name: action.name}
    case types.AUTH_LOGIN_FAILURE:
      return {...state, fetching: false}
    case types.AUTH_SIGNUP_REQUEST:
      return {...state, fetching: true}
    case types.AUTH_SIGNUP_SUCCESS:
      return {...state, fetching: false, name: action.name}
    case types.AUTH_SIGNUP_FAILURE:
      return {...state, fetching: false}
    case types.AUTH_LOGOUT_REQUEST:
      return {...state, fetching: true}
    case types.AUTH_LOGOUT_SUCCESS:
      return {...state, fetching: false, name: undefined}
    case types.AUTH_LOGOUT_FAILURE:
      return {...state, fetching: false}
  }
  return state
}
