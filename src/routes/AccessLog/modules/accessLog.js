import {fetchGet} from '../../../modules/apiUtils'

export const GET_ACCESS_LOG_REQUEST = 'GET_ACCESS_LOG_REQUEST'
export const GET_ACCESS_LOG_SUCCESS = 'GET_ACCESS_LOG_SUCCESS'
export const GET_ACCESS_LOG_FAILURE = 'GET_ACCESS_LOG_FAILURE'

export function getAccessLog() {
  return (dispatch) => {
    dispatch({
      type: GET_ACCESS_LOG_REQUEST
    })

    return fetchGet('/admin/access_log/')
      .then(response => {
        dispatch({
          type: GET_ACCESS_LOG_SUCCESS,
          requests: response.data.requests
        })
      })
      .catch(ex => {
        console.dir(ex)
        dispatch({
          type: GET_ACCESS_LOG_FAILURE,
          errorText: ex.message
        })
      })
  }
}

const initialState = {
  requests: []
}

export default function accessLogReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACCESS_LOG_REQUEST:
      return {...state, fetching: true, errorText: null}
    case GET_ACCESS_LOG_SUCCESS:
      return {...state, fetching: false, requests: action.requests}
    case GET_ACCESS_LOG_FAILURE:
      return {...state, fetching: false, errorText: action.errorText}
  }
  return state
}
