import {apiLink} from '../../../modules/formatUtils'

import * as types from './authConstants'

export function authHi() {
  return dispatch => {
    dispatch(authHiRequest())
    return fetch(apiLink('/hi/'))
      .then(res => res.json())
      .then(json => dispatch(authHiSuccess(json.data)))
      .catch(ex => dispatch(authHiFailure(ex)))
  }
}

function authHiRequest() {
  return {
    type: types.AUTH_HI_REQUEST
  }
}

function authHiSuccess(username) {
  return {
    type: types.AUTH_HI_SUCCESS,
    name: username
  }
}

function authHiFailure() {
  return {
    type: types.AUTH_HI_FAILURE
  }
}

export function authLogin(username, password) {
  return dispatch => {
    dispatch(authLoginRequest(username, password))
    return fetch(apiLink('/login/'), {
      method: 'post',
      body: JSON.stringify({username: username, password: password})
    }).then(res => res.json())
      .then(json => dispatch(authLoginSuccess(json.data)))
      .catch(ex => dispatch(authLoginFailure(ex)))
  }
}

function authLoginRequest(username, password) {
  return {
    type: types.AUTH_LOGIN_REQUEST,
    name: username,
    pass: password
  }
}

function authLoginSuccess(username) {
  return {
    type: types.AUTH_LOGIN_SUCCESS,
    name: username
  }
}

function authLoginFailure(username, password) {
  return {
    type: types.AUTH_LOGIN_FAILURE
  }
}

export function authSignup(username, password, email) {
  return dispatch => {
    dispatch(authSignupRequest(username, password, email))
    return fetch(apiLink('/login/'), {
      method: 'post',
      body: JSON.stringify({username: username, password: password, email: email, isReg: true})
    }).then(res => res.json())
      .then(json => dispatch(authSignupSuccess(json.data)))
      .catch(ex => dispatch(authHiFailure(ex)))
  }
}

function authSignupRequest(username, password, email) {
  return {
    type: types.AUTH_SIGNUP_REQUEST,
    name: username,
    pass: password,
    mail: email
  }
}

export function authSignupSuccess(username) {
  return {
    type: types.AUTH_SIGNUP_SUCCESS,
    name: username
  }
}

export function authLogout() {
  return dispatch => {
    dispatch(authLogoutRequest())
    return fetch(apiLink('/logout/'), {
      method: 'post'
    }).then(res => res.json())
      .then(json => dispatch(authLogoutSuccess()))
      .catch(ex => dispatch(authLogoutFailure(ex)))
  }
}

export function authLogoutRequest() {
  return {
    type: types.AUTH_LOGOUT_REQUEST
  }
}

export function authLogoutSuccess() {
  return {
    type: types.AUTH_LOGOUT_SUCCESS
  }
}

export function authLogoutFailure() {
  return {
    type: types.AUTH_LOGOUT_FAILURE
  }
}
