import {fetchGet, fetchPost} from '../../../modules/apiUtils'
import {change} from 'redux-form'

export const GET_COMPILATIONS_REQUEST = 'GET_COMPILATIONS_REQUEST'
export const GET_COMPILATIONS_SUCCESS = 'GET_COMPILATIONS_SUCCESS'
export const GET_COMPILATIONS_FAILURE = 'GET_COMPILATIONS_FAILURE'

export const CREATE_COMPILATIONS_REQUEST = 'CREATE_COMPILATIONS_REQUEST'
export const CREATE_COMPILATIONS_SUCCESS = 'CREATE_COMPILATIONS_SUCCESS'
export const CREATE_COMPILATIONS_FAILURE = 'CREATE_COMPILATIONS_FAILURE'

export function getCompilations(libraryName) {
  return (dispatch) => {
    dispatch({
      type: GET_COMPILATIONS_REQUEST
    })

    return fetchGet(`/music/libraries/${libraryName}`)
      .then(compilations => {
        console.dir(compilations)
        dispatch({
          type: GET_COMPILATIONS_SUCCESS,
          payload: compilations.data
        })
      })
  }
}

export function createCompilationsBulk(libraryName, tracks, base) {
  return (dispatch) => {
    dispatch({
      type: CREATE_COMPILATIONS_REQUEST
    })

    fetchPost(`/music/libraries/${libraryName}`, {
      body: JSON.stringify({tracks, base})
    })
      .then(response => {
        dispatch({
          type: CREATE_COMPILATIONS_SUCCESS,
        })
      })
  }
}

export function calculateBase(form, data) {
  let tracks = JSON.parse(data)
  let base = tracks.reduce((base, currTrack) => {
    const curr = currTrack.dir
    const minLen = Math.min(base.length, curr.length)
    let i = 0
    while (i < minLen && base[i] === curr[i]) {
      i++
    }
    if (i < base.length) {
      return base.substring(0, i)
    }
    return base
  }, tracks[0].dir)

  let startDirPos = base.lastIndexOf('/', base.length - 2)
  return (dispatch) => {
    dispatch(change(form, 'base', base))
    dispatch(change(form, 'name', base.substring(startDirPos + 1, base.length - 1)))
  }
}

const initialState = {
  fetching: false,
  compilations: [],
}

export default function librariesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMPILATIONS_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case GET_COMPILATIONS_SUCCESS:
      return {
        ...state,
        fetching: false,
        compilations: action.payload
      }
    case GET_COMPILATIONS_FAILURE:
      return {
        ...state,
      }
    case CREATE_COMPILATIONS_REQUEST:
      return {...state}
    case CREATE_COMPILATIONS_SUCCESS:
      return {...state}
    case CREATE_COMPILATIONS_FAILURE:
      return {...state}
  }

  return state
}
