import {fetchGet} from '../../../modules/apiUtils'

export const GET_FEATURED_TRACKS_REQUEST = 'GET_FEATURED_TRACKS_REQUEST'
export const GET_FEATURED_TRACKS_SUCCESS = 'GET_FEATURED_TRACKS_SUCCESS'
export const GET_FEATURED_TRACKS_FAILED = 'GET_FEATURED_TRACKS_FAILED'

export function getFeaturedTracks() {
  return (dispatch) => {
    dispatch({
      type: GET_FEATURED_TRACKS_REQUEST
    })

    return fetchGet('/music/random')
      .then(tracks => {
        dispatch({
          type: GET_FEATURED_TRACKS_SUCCESS,
          tracks: tracks.data
        })
      })
  }
}

const initialState = {
  tracks: []
}

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FEATURED_TRACKS_REQUEST:
      return {
        ...state,
        fetchingTracks: true
      }
    case GET_FEATURED_TRACKS_SUCCESS:
      return {
        ...state,
        featuredTracks: false,
        tracks: action.tracks
      }
  }
  return state
}
