export const GET_ARTISTS_REQUEST = 'GET_ARTISTS_REQUEST';
export const GET_ARTISTS_SUCCESS = 'GET_ARTISTS_SUCCESS';
export const GET_ARTISTS_FAILED = 'GET_ARTISTS_FAILED';

export const CHANGE_ARTISTS_FILTER = 'CHANGE_ARTISTS_FILTER'

import {apiLink} from '../../../modules/formatUtils'

export function getArtists() {
  return (dispatch) => {
    dispatch({
      type: GET_ARTISTS_REQUEST
    })

    fetch(apiLink('/music/artists/')).then(res => {
      return res.json()
    }).then(artists => {
      dispatch({
        type: GET_ARTISTS_SUCCESS,
        payload: artists.data
      })
    })
  }
}

export function changeArtistsFilter(mask) {
  return {
    type: CHANGE_ARTISTS_FILTER,
    mask: mask
  }
}


export const actions = {
  getArtists,
  changeArtistsFilter
}

const initialState = {
  fetching: false,
  artists: [],
  artistsMask: ''
};

export default function artistsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTISTS_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case GET_ARTISTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        artists: action.payload
      }
    case CHANGE_ARTISTS_FILTER:
      return {
        ...state,
        artistsMask: action.mask
      }
  }

  return state;
}
