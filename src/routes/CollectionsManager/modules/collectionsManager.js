import {fetchGet, fetchPost, fetchDelete} from '../../../modules/apiUtils'
import {change} from 'redux-form'

export const SEND_COLLECTION_REQUEST = 'SEND_COLLECTION_REQUEST'
export const SEND_COLLECTION_SUCCESS = 'SEND_COLLECTION_SUCCESS'
export const SEND_COLLECTION_FAILURE = 'SEND_COLLECTION_FAILURE'

export const DELETE_COLLECTIONS_REQUEST = 'DELETE_COLLECTIONS_REQUEST'
export const DELETE_COLLECTIONS_SUCCESS = 'DELETE_COLLECTIONS_SUCCESS'
export const DELETE_COLLECTIONS_FAILURE = 'DELETE_COLLECTIONS_FAILURE'

export const DELETE_SONGS_REQUEST = 'DELETE_SONGS_REQUEST'
export const DELETE_SONGS_SUCCESS = 'DELETE_SONGS_SUCCESS'
export const DELETE_SONGS_FAILURE = 'DELETE_SONGS_FAILURE'

export const EXTRACT_SONGS_REQUEST = 'EXTRACT_SONGS_REQUEST'
export const EXTRACT_SONGS_SUCCESS = 'EXTRACT_SONGS_SUCCESS'
export const EXTRACT_SONGS_FAILURE = 'EXTRACT_SONGS_FAILURE'

export function sendCollection(path, name, base, musicData) {
  return (dispatch) => {
    dispatch({
      type: SEND_COLLECTION_REQUEST
    })

    fetchPost(`/music/collections`, {
      body: JSON.stringify({
        path: path,
        name: name,
        tracks: musicData,
        base: base,
      })
    })
      .then(response => {
        dispatch({
          type: SEND_COLLECTION_SUCCESS,
          users: response.data
        })
      })
  }
}

export function deleteCollections() {
  return (dispatch) => {
    dispatch({
      type: DELETE_COLLECTIONS_REQUEST
    })

    fetchDelete(`/music/collections`)
      .then(response => {
        dispatch({
          type: DELETE_COLLECTIONS_SUCCESS
        })
      })
  }
}

export function deleteSongs() {
  return (dispatch) => {
    dispatch({
      type: DELETE_SONGS_REQUEST
    })

    fetchDelete(`/music/songs`)
      .then(response => {
        dispatch({
          type: DELETE_SONGS_SUCCESS
        })
      })
  }
}

export function extractSongs() {
  return (dispatch) => {
    dispatch({
      type: EXTRACT_SONGS_REQUEST
    })

    fetchPost(`/music/extract`)
      .then(response => {
        dispatch({
          type: EXTRACT_SONGS_SUCCESS
        })
      })
  }
}

const initialState = {
  collections: [],
  fetching: false
}

export default function collectionsManagerReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_COLLECTION_REQUEST:
      return {...state, fetching: true}
    case SEND_COLLECTION_SUCCESS:
      return {...state, fetching: false}
    case SEND_COLLECTION_FAILURE:
      return {...state, fetching: false}
    case DELETE_COLLECTIONS_REQUEST:
      return {...state, fetching: true}
    case DELETE_COLLECTIONS_SUCCESS:
      return {...state, fetching: false}
    case DELETE_COLLECTIONS_FAILURE:
      return {...state, fetching: false}
    case DELETE_SONGS_REQUEST:
      return {...state, fetching: true}
    case DELETE_SONGS_SUCCESS:
      return {...state, fetching: false}
    case DELETE_SONGS_FAILURE:
      return {...state, fetching: false}
    case EXTRACT_SONGS_REQUEST:
      return {...state, fetching: true}
    case EXTRACT_SONGS_SUCCESS:
      return {...state, fetching: false}
    case EXTRACT_SONGS_FAILURE:
      return {...state, fetching: false}
  }
  return state
}
