import {apiLink} from './formatUtils'
import {setUser} from '../components/Auth/modules/authActions'
import jwtDecode from 'jwt-decode'

const defaultHeaders = {
  'Content-Type': 'application/json'
}

const defaultGetOptions = {
  credentials: 'include',
  cache: 'no-cache',
  headers: defaultHeaders
}

const defaultPostOptions = {
  method: 'POST',
  credentials: 'include',
  cache: 'no-cache',
  headers: defaultHeaders
}

const defaultPutOptions = {
  method: 'PUT',
  credentials: 'include',
  cache: 'no-cache',
  headers: defaultHeaders
}

const defaultDeleteOptions = {
  method: 'DELETE',
  credentials: 'include',
  cache: 'no-cache',
  headers: defaultHeaders
}

function secureFetch(url, options) {
  const token = localStorage.getItem('auth')
  if (token) {
    options.headers['Auth'] = token
  }
  return fetch(url, options)
}

const props = {
  store: null
}
export function setStore(store) {
  props.store = store
}

export function fetchGet(url, options = {}) {
  return secureFetch(apiLink(url), {
    ...defaultGetOptions,
    ...options
  }).then(handleResponse)
}

export function fetchPost(url, options = {}) {
  return secureFetch(apiLink(url), {
    ...defaultPostOptions,
    ...options
  }).then(handleResponse)
}

export function fetchPut(url, options = {}) {
  return secureFetch(apiLink(url), {
    ...defaultPutOptions,
    ...options
  }).then(handleResponse)
}

export function fetchDelete(url, options = {}) {
  return secureFetch(apiLink(url), {
    ...defaultDeleteOptions,
    ...options
  }).then(handleResponse)
}

export function handleResponse(response) {
  return new Promise((resolve, reject) => {
    if (response.status === 401) {
      console.error('Forbidden 401. Remove token.')
      localStorage.removeItem('auth')
      props.store.dispatch(setUser({}))
    }
    const token = response.headers.get('Auth')
    if (token) {
      try {
        const user = jwtDecode(token)
        console.log('Received auth token. Save in storage.')
        console.log(user)
        localStorage.setItem('auth', token)
        props.store.dispatch(setUser(user))
      } catch (e) {
        console.error('Invalid token.', e)
        localStorage.removeItem('auth')
        props.store.dispatch(setUser({}))
      }
    }
    return response.json()
      .then(json => {
        resolve({
          status: response.status,
          ok: response.ok,
          json
        })
      })
      .catch(err => {
        if (!response.ok) {
          console.error(`Failed request: ${response.status} - ${response.statusText}`)
          console.dir(err)
          reject({
            status: response.status,
            message: response.message || response.statusText
          })
        } else {
          console.error(`Unhandled error`)
          console.dir(err)
          reject(err)
        }
      })
  }).then((parsedResponse) => {
    return new Promise((resolve, reject) => {
      if (parsedResponse.ok) {
        resolve(parsedResponse.json)
      } else {
        console.warn(`Response status is not ok: ${parsedResponse.status}`)
        if (parsedResponse.status === 500) {
          reject({
            message: 'Server Error',
            status: parsedResponse.status
          })
        } else {
          reject(parsedResponse.json)
        }
      }
    })
  })
}
