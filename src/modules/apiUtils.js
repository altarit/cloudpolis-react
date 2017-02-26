import {apiLink} from './formatUtils'

const defaultHeaders = {
  'Content-Type': 'application/json'
}

const defaultGetOptions = {
  credentials: 'include',
  cache: 'no-cache'
}

const defaultPostOptions = {
  method: 'POST',
  credentials: 'include',
  cache: 'no-cache',
  headers: defaultHeaders
}

export function fetchGet(url, options = {}) {
  return fetch(apiLink(url), {
    ...defaultGetOptions,
    ...options
  }).then(handleResponse)
}

export function fetchPost(url, options = {}) {
  return fetch(apiLink(url), {
    ...defaultPostOptions,
    ...options
  }).then(handleResponse)
}

export function handleResponse(response) {
  return new Promise((resolve, reject) => {
    // console.log('handle response')
    // console.dir(response)
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
      if (parsedResponse.ok) { resolve(parsedResponse.json) } else {
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
