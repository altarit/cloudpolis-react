import {fetchGet} from '../../../modules/apiUtils'

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST'
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE'

export function getUsers() {
  return (dispatch) => {
    dispatch({
      type: GET_USERS_REQUEST
    })

    fetchGet('/users/')
      .then(response => {
        dispatch({
          type: GET_USERS_SUCCESS,
          users: response.data
        })
      })
  }
}

const initialState = {
  users: []
}

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {...state, fetching: true}
    case GET_USERS_SUCCESS:
      return {...state, fetching: false, users: action.users}
    case GET_USERS_FAILURE:
      return {...state, fetching: false}
  }
  return state
}
