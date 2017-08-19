import {fetchGet} from '../../../modules/apiUtils'

export const GET_ARTIST_REQUEST = 'GET_ARTIST_REQUEST'
export const GET_ARTIST_SUCCESS = 'GET_ARTIST_SUCCESS'
export const GET_ARTIST_FAILED = 'GET_ARTIST_FAILED'

export function getArtist($artistsLibrary, artistName) {
  return (dispatch) => {
    dispatch({
      type: GET_ARTIST_REQUEST
    })

    return fetchGet(`/music/artists/${$artistsLibrary}/${artistName}`)
      .then(artist => {
        dispatch({
          type: GET_ARTIST_SUCCESS,
          albums: artist.data.albums
        })
      })
  }
}

const initialState = {
  fetching: false,
  tracks: [],
  albums: [],
}

export default function artistsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTIST_REQUEST:
      return {...state, albums: [], tracks: [], fetching: true}
    case GET_ARTIST_SUCCESS:
      let tracks = (action.albums || []).reduce((res, album) => {
        if (album) res.push(...album.tracks);
        return res;
        }, [])
      let albums = action.albums.filter(alb => alb.tracks.length)
      return {...state, albums: albums, tracks: tracks, fetching: false}
    case GET_ARTIST_FAILED:
      return {...state, fetching: false, errorText: action.errorText}
  }

  return state
}
