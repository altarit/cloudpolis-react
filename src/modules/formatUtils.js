const BASE_URL = __DEV__ ? '' : 'http://localhost'
// const BASE_URL = ''

export function toMMSS(val) {
  if (!val) return '-:--'
  var minutes = Math.floor(val / 60)
  var seconds = Math.floor(val - minutes * 60)
  return (seconds < 10)
    ? minutes + ':0' + seconds
    : minutes + ':' + seconds
}

export function randomString() {
  return Math.random().toString(36).substring(7)
}

// http://localhost
export function apiLink(link) {
  return BASE_URL + '/api' + link
}

export function trackLink(src) {
  if (!src) return null
  return BASE_URL + '/artists/' + src
}
