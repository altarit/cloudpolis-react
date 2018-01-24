import {fetchGet, fetchPost, fetchDelete} from '../../../modules/apiUtils'
import {openConfirmation, openSingleInput} from '../../../modules/popups'

export const GET_LIBRARIES_REQUEST = 'GET_LIBRARIES_REQUEST'
export const GET_LIBRARIES_SUCCESS = 'GET_LIBRARIES_SUCCESS'
export const GET_LIBRARIES_FAILURE = 'GET_LIBRARIES_FAILURE'

export const CREATE_LIBRARIES_REQUEST = 'CREATE_LIBRARIES_REQUEST'
export const CREATE_LIBRARIES_SUCCESS = 'CREATE_LIBRARIES_SUCCESS'
export const CREATE_LIBRARIES_FAILURE = 'CREATE_LIBRARIES_FAILURE'

export const DELETE_LIBRARY_REQUEST = 'DELETE_LIBRARY_REQUEST'
export const DELETE_LIBRARY_SUCCESS = 'DELETE_LIBRARY_SUCCESS'
export const DELETE_LIBRARY_FAILURE = 'DELETE_LIBRARY_FAILURE'

export function getLibraries() {
  return (dispatch) => {
    dispatch({
      type: GET_LIBRARIES_REQUEST
    })

    return fetchGet('/music/libraries/')
      .then(libraries => {
        dispatch({
          type: GET_LIBRARIES_SUCCESS,
          payload: libraries.data
        })
      })
  }
}

export function createLibrary(defaultValue) {
  const createLibraryAction = result => dispatch => {
    dispatch({
      type: CREATE_LIBRARIES_REQUEST
    })

    fetchPost(`/music/libraries`, {
      body: JSON.stringify({
        name: result,
      })
    })
      .then(response => {
        dispatch({
          type: CREATE_LIBRARIES_SUCCESS,
        })
      })
  }

  return openSingleInput(`Library name:`, 'Create', defaultValue, createLibraryAction)
}

export function deleteLibrary(name) {
  const deleteAction = (dispatch) => {
    dispatch({
      type: DELETE_LIBRARY_REQUEST
    })

    fetchDelete(`/music/libraries/${name}`, {})
      .then(response => {
        dispatch({
          type: DELETE_LIBRARY_SUCCESS,
        })
      })
  }

  return openConfirmation(`Do you really want to delete library '${name}'?`, 'Delete', 'Cancel', deleteAction)
}

const initialState = {
  fetching: false,
  libraries: [],
}

export default function librariesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIBRARIES_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case GET_LIBRARIES_SUCCESS:
      return {
        ...state,
        fetching: false,
        libraries: action.payload
      }
    case GET_LIBRARIES_FAILURE:
      return {
        ...state,
      }
    case CREATE_LIBRARIES_REQUEST:
      return {...state}
    case CREATE_LIBRARIES_SUCCESS:
      return {...state}
    case CREATE_LIBRARIES_FAILURE:
      return {...state}
    case DELETE_LIBRARY_REQUEST:
      return {...state}
    case DELETE_LIBRARY_SUCCESS:
      return {...state}
    case DELETE_LIBRARY_FAILURE:
      return {...state}
  }

  return state
}
