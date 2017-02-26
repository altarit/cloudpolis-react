import {fetchGet} from '../../../modules/apiUtils'

export const GET_TRACKS_BY_QUERY_REQUEST = 'GET_TRACKS_BY_QUERY_REQUEST'
export const GET_TRACKS_BY_QUERY_SUCCESS = 'GET_TRACKS_BY_QUERY_SUCCESS'
export const GET_TRACKS_BY_QUERY_FAILED = 'GET_TRACKS_BY_QUERY_FAILED'

export function getTracksByQuery(query) {
  return (dispatch) => {
    dispatch({
      type: GET_TRACKS_BY_QUERY_REQUEST
    })

    return fetchGet('/music/search?query=' + query)
      .then(result => {
        dispatch({
          type: GET_TRACKS_BY_QUERY_SUCCESS,
          payload: result.data
        })
      })
  }
}

const initialState = {
  fetching: false,
  songs: []
}

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRACKS_BY_QUERY_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case GET_TRACKS_BY_QUERY_SUCCESS:
      return {
        ...state,
        songs: action.payload,
        fetching: false
      }
  }

  return state
}
