import {fetchGet} from '../../../modules/apiUtils'
import queryString from 'query-string'

export const ACCESS_LOG_CHANGE_LIMIT = 'ACCESS_LOG_CHANGE_LIMIT'
export const ACCESS_LOG_CHANGE_PAGE = 'ACCESS_LOG_CHANGE_PAGE'

export const GET_ACCESS_LOG_REQUEST = 'GET_ACCESS_LOG_REQUEST'
export const GET_ACCESS_LOG_SUCCESS = 'GET_ACCESS_LOG_SUCCESS'
export const GET_ACCESS_LOG_FAILURE = 'GET_ACCESS_LOG_FAILURE'

export function getAccessLog(filters, limit, page) {
  return (dispatch) => {
    dispatch({
      type: GET_ACCESS_LOG_REQUEST
    })

    return fetchGet('/admin/access_log/?' + queryString.stringify({...filters, limit, page}))
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

export function changeLimit(limit) {
  return {
    type: ACCESS_LOG_CHANGE_LIMIT,
    limit
  }
}


export function changePage(page) {
  return {
    type: ACCESS_LOG_CHANGE_PAGE,
    page
  }
}


const initialState = {
  requests: [],
  limit: 50,
  page: 0
}

export default function accessLogReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACCESS_LOG_REQUEST:
      return {...state, fetching: true, errorText: null}
    case GET_ACCESS_LOG_SUCCESS:
      return {...state, fetching: false, requests: action.requests}
    case GET_ACCESS_LOG_FAILURE:
      return {...state, fetching: false, errorText: action.errorText}
    case ACCESS_LOG_CHANGE_LIMIT:
      return {...state, limit: action.limit}
    case ACCESS_LOG_CHANGE_PAGE:
      return {...state, page: action.page}
  }
  return state
}
