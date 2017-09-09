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

export default function artistsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTIST_REQUEST:
      return {...state, albums: [], tracks: [], fetching: true, q: 2}
    case GET_ARTIST_SUCCESS:
      // let tracks = (action.albums || []).reduce((res, album) => {
      //   if (album) res.push(...album.tracks);
      //   return res;
      //   }, [])
      let tracks = action.tracks
      // let albums = [];//action.albums.filter(alb => alb.tracks.length)
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
      console.log(albums)
      return {...state, albums: albums, tracks: tracks, fetching: false}
    case GET_ARTIST_FAILED:
      return {...state, fetching: false, errorText: action.errorText}
  }

  return state
}
