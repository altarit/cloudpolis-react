import {fetchGet, fetchPost} from '../../../modules/apiUtils'
import {change} from 'redux-form'

export const GET_COMPILATIONS_REQUEST = 'GET_COMPILATIONS_REQUEST'
export const GET_COMPILATIONS_SUCCESS = 'GET_COMPILATIONS_SUCCESS'
export const GET_COMPILATIONS_FAILURE = 'GET_COMPILATIONS_FAILURE'

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
  }

  return state
}
