import {fetchGet} from '../../../modules/apiUtils'

export const GET_COLLECTIONS_REQUEST = 'GET_COLLECTIONS_REQUEST'
export const GET_COLLECTIONS_SUCCESS = 'GET_COLLECTIONS_SUCCESS'
export const GET_COLLECTIONS_FAILURE = 'GET_COLLECTIONS_FAILURE'

export function getCollections() {
  return (dispatch) => {
    dispatch({
      type: GET_COLLECTIONS_REQUEST
    })

    fetchGet('/music/collections/')
      .then(response => {
        dispatch({
          type: GET_COLLECTIONS_SUCCESS,
          users: response.data
        })
      })
  }
}

const initialState = {
  collections: []
}

export default function collectionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COLLECTIONS_REQUEST:
      return {...state, fetching: true}
    case GET_COLLECTIONS_SUCCESS:
      return {...state, fetching: false, collections: action.collections}
    case GET_COLLECTIONS_FAILURE:
      return {...state, fetching: false}
  }
  return state
}
