import {fetchGet} from './apiUtils'
import {lightEncode} from './formatUtils'

export function sendSingleStat(lib, compilation, track) {
  return () => {
    let params = {
      body: {lib, compilation, track}
    }
    return fetchGet(`/music/stats/single?${lightEncode(lib + ';' + compilation + ';' + track)}`)
      .then(response => {
        console.log(`Sent stats`)
      })
  }
}


const initialState = {}
export default function statsReducer(state = initialState, action) {
  return state
}
