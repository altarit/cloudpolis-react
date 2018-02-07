const BASE_URL = !__DEV__ ? '' : 'http://localhost'
// const BASE_URL = ''

export function toMMSS(val) {
  if (!val) return ''
  let minutes = Math.floor(val / 60)
  let seconds = Math.floor(val - minutes * 60)
  return (seconds < 10)
    ? minutes + ':0' + seconds
    : minutes + ':' + seconds
}

export function apiLink(link) {
  return BASE_URL + '/api' + link
}

export function trackLink(src) {
  if (!src) return null
  return BASE_URL + '/library' + src
}

export function lightEncode(text) {
  return text.replace(/ /g,'+')
}
