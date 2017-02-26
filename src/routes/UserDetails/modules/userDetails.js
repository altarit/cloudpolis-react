import {fetchGet} from '../../../modules/apiUtils'

export const GET_USER_DETAILS_REQUEST = 'GET_USER_DETAILS_REQUEST'
export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS'
export const GET_USER_DETAILS_FAILURE = 'GET_USER_DETAILS_FAILURE'

export function getUserDetails(username) {
  return (dispatch) => {
    dispatch({
      type: GET_USER_DETAILS_REQUEST
    })

    return fetchGet(`/users/${username}`)
      .then(response => {
        dispatch({
          type: GET_USER_DETAILS_SUCCESS,
          data: response.data
        })
      })
      .catch(ex => {
        console.dir(ex)
        dispatch({
          type: GET_USER_DETAILS_FAILURE,
          errorText: ex.message
        })
      })
  }
}

const initialState = {}

export default function userDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DETAILS_REQUEST:
      return {fetching: true}
    case GET_USER_DETAILS_SUCCESS:
      return {...state, fetching: false, created: action.data.created, additional: action.data.additional}
    case GET_USER_DETAILS_FAILURE:
      return {fetching: false, errorText: action.errorText}
  }
  return state
}
