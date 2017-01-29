export const GET_ARTIST_REQUEST = 'GET_ARTIST_REQUEST'
export const GET_ARTIST_SUCCESS = 'GET_ARTIST_SUCCESS'
export const GET_ARTIST_FAILED = 'GET_ARTIST_FAILED'

import { updatePlaylist } from '../../../modules/player'
import { apiLink } from '../../../modules/formatUtils'

export function getArtist (artistName) {
  return (dispatch) => {
    dispatch({
      type: GET_ARTIST_REQUEST
    })

    fetch(apiLink('/music/artists/' + artistName)).then(res => {
      return res.json()
    }).then(artist => {
      dispatch({
        type: GET_ARTIST_SUCCESS,
        payload: artist.data
      })
    })
  }
}

const initialState = {
  fetching: false,
  songs: []
}

export default function artistsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_ARTIST_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case GET_ARTIST_SUCCESS:
      return {
        ...action.payload,
        fetching: false
      }
  }

  return state
}
