import {fetchGet} from '../../../modules/apiUtils'

export const GET_ARTISTS_REQUEST = 'GET_ARTISTS_REQUEST'
export const GET_ARTISTS_SUCCESS = 'GET_ARTISTS_SUCCESS'
export const GET_ARTISTS_FAILED = 'GET_ARTISTS_FAILED'

export const CHANGE_ARTISTS_FILTER = 'CHANGE_ARTISTS_FILTER'

export function getArtists() {
  return (dispatch) => {
    dispatch({
      type: GET_ARTISTS_REQUEST
    })

    return fetchGet('/music/artists/')
      .then(artists => {
        console.dir(artists)
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

function filterArtists(artists, mask) {
  if (!mask) {
    return artists
  }

  let rx = new RegExp(mask, 'i')
  let result = artists.filter(artist => {
    return rx.test(artist.name)
  })
  return result
}

const initialState = {
  fetching: false,
  artists: [],
  filteredArtists: [],
  artistsMask: ''
}

export default function artistsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTISTS_REQUEST:
      return {
        ...state,
        fetching: true,
        artistsMask: ''
      }
    case GET_ARTISTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        artists: action.payload,
        filteredArtists: filterArtists(action.payload, state.artistsMask)
      }
    case CHANGE_ARTISTS_FILTER:
      return {
        ...state,
        artistsMask: action.mask,
        filteredArtists: filterArtists(state.artists, action.mask)
      }
  }

  return state
}
