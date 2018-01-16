import {apiLink} from './formatUtils'

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
    console.log('handle response')
    console.dir(response)
    const token = response.headers.get('Auth')
    if (token) {
      localStorage.setItem('auth', token)
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
