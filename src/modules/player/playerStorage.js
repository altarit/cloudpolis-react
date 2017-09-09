import {cloneTrack} from './playerUtils'

export const STORAGE_LOAD_PLAYLISTS_SUCCESS = 'STORAGE_LOAD_PLAYLISTS_SUCCESS'
export const STORAGE_SAVE_PLAYLIST_SUCCESS = 'STORAGE_SAVE_PLAYLIST_SUCCESS'
export const STORAGE_OPEN_PLAYLIST_SUCCESS = 'STORAGE_OPEN_PLAYLIST_SUCCESS'
export const STORAGE_DELETE_PLAYLIST_SUCCESS = 'STORAGE_DELETE_PLAYLIST_SUCCESS'

// --------------------------------
// Actions
// --------------------------------

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

// --------------------------------
// Reducer
// --------------------------------

export default function playerLocalStorageReducer(state, action) {
  switch (action.type) {
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
  }
  return state
}
