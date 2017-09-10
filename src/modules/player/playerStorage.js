import {fetchGet, fetchPut, fetchDelete} from '../../modules/apiUtils'
import {cloneTrack} from './playerUtils'

export const OPEN_PLAYLIST_DIALOG_SELECT_LOCAL_TAB = 'OPEN_PLAYLIST_DIALOG_SELECT_LOCAL_TAB'

export const STORAGE_LOAD_PLAYLISTS_SUCCESS = 'STORAGE_LOAD_PLAYLISTS_SUCCESS'
export const STORAGE_SAVE_PLAYLIST_SUCCESS = 'STORAGE_SAVE_PLAYLIST_SUCCESS'
export const STORAGE_OPEN_PLAYLIST_SUCCESS = 'STORAGE_OPEN_PLAYLIST_SUCCESS'
export const STORAGE_DELETE_PLAYLIST_SUCCESS = 'STORAGE_DELETE_PLAYLIST_SUCCESS'

export const GET_SERVER_PLAYLISTS_REQUEST = 'GET_SERVER_PLAYLISTS_REQUEST'
export const GET_SERVER_PLAYLISTS_SUCCESS = 'GET_SERVER_PLAYLISTS_SUCCESS'
export const GET_SERVER_PLAYLISTS_FAILED = 'GET_SERVER_PLAYLISTS_FAILED'

export const PUT_SERVER_PLAYLIST_REQUEST = 'PUT_SERVER_PLAYLIST_REQUEST'
export const PUT_SERVER_PLAYLIST_SUCCESS = 'PUT_SERVER_PLAYLIST_SUCCESS'
export const PUT_SERVER_PLAYLIST_FAILED = 'PUT_SERVER_PLAYLIST_FAILED'

export const DELETE_SERVER_PLAYLIST_REQUEST = 'DELETE_SERVER_PLAYLIST_REQUEST'
export const DELETE_SERVER_PLAYLIST_SUCCESS = 'DELETE_SERVER_PLAYLIST_SUCCESS'
export const DELETE_SERVER_PLAYLIST_FAILED = 'DELETE_SERVER_PLAYLIST_FAILED'

export const STORAGE_SERVER_OPEN_PLAYLIST = 'STORAGE_OPEN_SERVER_PLAYLIST'

// --------------------------------
// Actions
// --------------------------------

// Local Storage

export function selectOpenDialogLocalTab(isLocal) {
  return {
    type: OPEN_PLAYLIST_DIALOG_SELECT_LOCAL_TAB,
    isLocal
  }
}

export function loadPlaylistsFromStorage() {
  return dispatch => {
    let safePlaylists = {}
    try {
      safePlaylists = JSON.parse(localStorage.getItem('safePlaylists')) || {}
    } catch (e) {
      console.warn(`Local storage 'safePlaylists' cannot be read`)
      safePlaylists = {}
    }
    dispatch({
      type: STORAGE_LOAD_PLAYLISTS_SUCCESS,
      safePlaylists
    })
  }
}

export function savePlaylistToStorage(filename, playlist) {
  return dispatch => {
    let safePlaylists = {}
    try {
      safePlaylists = JSON.parse(localStorage.getItem('safePlaylists')) || {}
    } catch (e) {
      console.warn(`Local storage 'safePlaylists' cannot be read`)
    }
    let nextPlaylists = {...safePlaylists, [filename]: playlist.map(cloneTrack)}
    localStorage.setItem('safePlaylists', JSON.stringify(nextPlaylists))
    dispatch({
      type: STORAGE_SAVE_PLAYLIST_SUCCESS,
      safePlaylists: nextPlaylists
    })
  }
}

export function openPlaylistFromStorage(filename) {
  return dispatch => {
    let safePlaylists = {}
    try {
      safePlaylists = JSON.parse(localStorage.getItem('safePlaylists')) || {}
    } catch (e) {
      console.warn(`Local storage 'safePlaylists' cannot be read`)
    }
    let playlist = safePlaylists[filename]
    if (playlist) {
      dispatch({
        type: STORAGE_OPEN_PLAYLIST_SUCCESS,
        filename,
        playlist
      })
    } else {
      console.error(`Playlist '${filename}' not found`)
    }
  }
}

export function deletePlaylistFromStorage(filename) {
  return dispatch => {
    let safePlaylists = {}
    try {
      safePlaylists = JSON.parse(localStorage.getItem('safePlaylists')) || {}
    } catch (e) {
      console.warn(`Local storage 'safePlaylists' cannot be read`)
    }
    let playlist = safePlaylists[filename]
    if (playlist) {
      delete safePlaylists[filename]
      localStorage.setItem('safePlaylists', JSON.stringify(safePlaylists))
      dispatch({
        type: STORAGE_DELETE_PLAYLIST_SUCCESS,
        safePlaylists
      })
    } else {
      console.error(`Playlist '${filename}' not found`)
    }
  }
}

// Server Storage

export function openServerPlaylist(playlistName) {
  return {
    type: STORAGE_SERVER_OPEN_PLAYLIST,
    name: playlistName
  }
}

export function getServerPlaylists(userName) {
  return (dispatch) => {
    dispatch({
      type: GET_SERVER_PLAYLISTS_REQUEST
    })

    return fetchGet(`/music/playlists/${userName}`)
      .then(response => {
        dispatch({
          type: GET_SERVER_PLAYLISTS_SUCCESS,
          playlists: response.data.playlists
        })
      })
  }
}

export function putServerPlaylist(userName, playlistName, tracks) {
  return (dispatch) => {
    dispatch({
      type: PUT_SERVER_PLAYLIST_REQUEST
    })

    let params = {
      body: JSON.stringify({tracks: tracks})
    }
    return fetchPut(`/music/playlists/${userName}/${playlistName}`, params)
      .then(response => {
        dispatch({
          type: PUT_SERVER_PLAYLIST_SUCCESS,
          playlists: response.data.playlists
        })
      })
  }
}

export function deleteServerPlaylist(userName, playlistName) {
  return (dispatch) => {
    dispatch({
      type: DELETE_SERVER_PLAYLIST_REQUEST
    })

    return fetchDelete(`/music/playlists/${userName}/${playlistName}`)
      .then(response => {
        dispatch({
          type: DELETE_SERVER_PLAYLIST_SUCCESS,
          playlistName: playlistName
        })
      })
  }
}

// --------------------------------
// Reducer
// --------------------------------

export default function playerLocalStorageReducer(state, action) {
  switch (action.type) {
    case OPEN_PLAYLIST_DIALOG_SELECT_LOCAL_TAB:
      return {...state, isLocal: action.isLocal}
    // local ones
    case STORAGE_LOAD_PLAYLISTS_SUCCESS:
      return {...state, safePlaylists: action.safePlaylists}
    case STORAGE_SAVE_PLAYLIST_SUCCESS:
      return {...state, safePlaylists: action.safePlaylists}
    case STORAGE_OPEN_PLAYLIST_SUCCESS:
      let nextPls = {...state.pls, [action.filename]: action.playlist}
      let nextTabs = ~state.tabs.indexOf(action.filename) ? state.tabs : [...state.tabs, action.filename]
      return {...state, pls: nextPls, tabs: nextTabs, openTab: action.filename}
    case STORAGE_DELETE_PLAYLIST_SUCCESS:
      return {...state, safePlaylists: action.safePlaylists}
    // server ones
    case STORAGE_SERVER_OPEN_PLAYLIST: {
      let serverPlIndex = state.serverPlaylists.find(el => el.name === action.name)
      let nextPls = {...state.pls, [action.name]: serverPlIndex.tracks}
      let nextTabs = ~state.tabs.indexOf(action.name) ? state.tabs : [...state.tabs, action.name]
      return {...state, pls: nextServerPls, tabs: nextServerTabs, openTab: action.name}
    }
    case GET_SERVER_PLAYLISTS_REQUEST:
      return {...state}
    case GET_SERVER_PLAYLISTS_SUCCESS:
      return {...state, serverPlaylists: action.playlists}
    case GET_SERVER_PLAYLISTS_FAILED:
      return {...state}
    case PUT_SERVER_PLAYLIST_REQUEST: {
      return {...state}
    }
    case PUT_SERVER_PLAYLIST_SUCCESS:
      let nextServerPlaylists = [...state.serverPlaylists]
      let serverPlIndex = state.serverPlaylists.findIndex(el => el.name === action.name)
      if (~serverPlIndex) {
        nextServerPlaylists[serverPlIndex] = action.playlist
      } else {
        nextServerPlaylists.push(action.playlist)
      }
      return {...state, serverPlaylists: nextServerPlaylists}
    case PUT_SERVER_PLAYLIST_FAILED:
      return {...state}
    case DELETE_SERVER_PLAYLIST_REQUEST:
      return {...state}
    case DELETE_SERVER_PLAYLIST_SUCCESS: {
      let nextServerPlaylists = [...state.serverPlaylists]
      let serverPlIndex = state.serverPlaylists.findIndex(el => el.name === action.name)
      if (~serverPlIndex) {
        nextServerPlaylists.splice(serverPlIndex, 1)
      }
      return {...state, serverPlaylists: nextServerPlaylists}
    }
    case DELETE_SERVER_PLAYLIST_FAILED:
      return {...state}
  }
  return state
}
