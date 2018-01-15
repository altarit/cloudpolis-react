import {fetchGet} from '../../../modules/apiUtils'

export const GET_PLAYLISTS_REQUEST = 'GET_PLAYLISTS_REQUEST'
export const GET_PLAYLISTS_SUCCESS = 'GET_PLAYLISTS_SUCCESS'
export const GET_PLAYLISTS_FAILED = 'GET_PLAYLISTS_FAILED'

export function getPlaylists() {
  return (dispatch) => {
    dispatch({
      type: GET_PLAYLISTS_REQUEST
    })

    return fetchGet(`/music/playlists`)
      .then(response => {
        dispatch({
          type: GET_PLAYLISTS_SUCCESS,
          playlists: response.data.playlists
        })
      })
  }
}

const initialState = {
  fetching: false,
  playlists: []
}

const ACTION_HANDLERS = {
  GET_PLAYLISTS_REQUEST: (state, action) => {
    return {...state, fetching: true}
  },
  GET_PLAYLISTS_SUCCESS: (state, action) => {
    return {...state, playlists: action.playlists, fetching: false}
  },
  GET_PLAYLISTS_FAILED: (state, action) => {
    return {...state, fetching: false, errorText: action.errorText}
  },
}

export default function playlistsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
