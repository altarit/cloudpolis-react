import {fetchGet, fetchPost} from '../../../modules/apiUtils'

import * as types from './authConstants'

export function resetStatus() {
  return {
    type: types.AUTH_RESET_STATUS
  }
}

export function hi() {
  return dispatch => {
    dispatch({
      type: types.AUTH_HI_REQUEST
    })

    return fetchGet('/hi/')
      .then(json => {
        dispatch({
          type: types.AUTH_HI_SUCCESS,
          name: json.data
        })
      })
      .catch(ex => {
        dispatch({
          type: types.AUTH_HI_FAILURE
        })
      })
  }
}

export function login(username, password) {
  return dispatch => {
    dispatch({
      type: types.AUTH_LOGIN_REQUEST,
      name: username,
      pass: password
    })

    return fetchPost('/login/', {
      body: JSON.stringify({username: username, password: password})
    }).then(json => {
      console.log('Successful request')
      dispatch({
        type: types.AUTH_LOGIN_SUCCESS,
        name: json.data
      })
    })
      .catch(ex => {
        console.warn(`Response ${ex.status}: ${ex.message}`)
        dispatch({
          type: types.AUTH_LOGIN_FAILURE,
          errorText: ex.message
        })
      })
  }
}

export function signup(username, password, email) {
  return dispatch => {
    dispatch({
      type: types.AUTH_SIGNUP_REQUEST,
      name: username,
      pass: password,
      mail: email
    })

    return fetchPost('/login/', {
      body: JSON.stringify({username: username, password: password, email: email, isreg: true})
    }).then(json => {
      dispatch({
        type: types.AUTH_SIGNUP_SUCCESS,
        name: json.data
      })
    })
      .catch(ex => {
        dispatch({
          type: types.AUTH_SIGNUP_FAILURE,
          errorText: ex.message
        })
      })
  }
}

export function logout() {
  return dispatch => {
    dispatch({
      type: types.AUTH_LOGOUT_REQUEST
    })

    return fetchPost('/logout/')
      .then(json => {
        dispatch({
          type: types.AUTH_LOGOUT_SUCCESS
        })
      })
      .catch(ex => {
        dispatch({
          type: types.AUTH_LOGOUT_FAILURE,
          errorText: ex.message
        })
      })
  }
}
