import {fetchGet} from '../../../modules/apiUtils'

export const GET_ARTIST_REQUEST = 'GET_ARTIST_REQUEST'
export const GET_ARTIST_SUCCESS = 'GET_ARTIST_SUCCESS'
export const GET_ARTIST_FAILED = 'GET_ARTIST_FAILED'

export function getArtist(artistsLibrary, artistName) {
  return (dispatch) => {
    dispatch({
      type: GET_ARTIST_REQUEST
    })

    return fetchGet(`/music/artists/${artistsLibrary}/${artistName}`)
      .then(response => {
        dispatch({
          type: GET_ARTIST_SUCCESS,
          tracks: response.data.artist.songs
        })
      })
  }
}

const initialState = {
  fetching: false,
  tracks: [],
  albums: [],
}

const ACTION_HANDLERS = {
  GET_ARTIST_REQUEST: (state, action) => {
    return {...state, albums: [], tracks: [], fetching: true, q: 2}
  },
  GET_ARTIST_SUCCESS: (state, action) => {
    let tracks = action.tracks
    let albumsHash = action.tracks.reduce((res, track) => {
      let albumName = track.album || track.compilation
      if (!res[albumName]) {
        res[albumName] = []
      }
      let album = res[albumName]
      album.push(track)
      return res
    }, [])
    let albums = []
    for (let albumName of Object.keys(albumsHash)) {
      albums.push({
        name: albumName,
        tracks: albumsHash[albumName]
      })
    }
    return {...state, albums: albums, tracks: tracks, fetching: false}
  },
  GET_ARTIST_FAILED: (state, action) => {
    return {...state, fetching: false, errorText: action.errorText}
  },
}

export default function artistsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
