import * as types from './storageConstants'
import {fetchGet, fetchPut, fetchDelete} from '../../apiUtils'
import {cloneTrack} from '../playerUtils'

// Local Storage

export function selectOpenDialogLocalTab(isLocal) {
  return {
    type: types.OPEN_PLAYLIST_DIALOG_SELECT_LOCAL_TAB,
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
      type: types.STORAGE_LOAD_PLAYLISTS_SUCCESS,
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
      type: types.STORAGE_SAVE_PLAYLIST_SUCCESS,
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
        type: types.STORAGE_OPEN_PLAYLIST_SUCCESS,
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
        type: types.STORAGE_DELETE_PLAYLIST_SUCCESS,
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
    type: types.STORAGE_SERVER_OPEN_PLAYLIST,
    name: playlistName
  }
}

export function getServerPlaylists(userName) {
  return (dispatch) => {
    dispatch({
      type: types.GET_SERVER_PLAYLISTS_REQUEST
    })

    return fetchGet(`/music/playlists/${userName}`)
      .then(response => {
        dispatch({
          type: types.GET_SERVER_PLAYLISTS_SUCCESS,
          playlists: response.data.playlists
        })
      })
  }
}

export function putServerPlaylist(userName, playlistName, tracks) {
  return (dispatch) => {
    dispatch({
      type: types.PUT_SERVER_PLAYLIST_REQUEST
    })

    let params = {
      body: JSON.stringify({tracks: tracks})
    }
    return fetchPut(`/music/playlists/${userName}/${playlistName}`, params)
      .then(response => {
        dispatch({
          type: types.PUT_SERVER_PLAYLIST_SUCCESS,
          playlists: response.data.playlists
        })
      })
  }
}

export function deleteServerPlaylist(userName, playlistName) {
  return (dispatch) => {
    dispatch({
      type: types.DELETE_SERVER_PLAYLIST_REQUEST
    })

    return fetchDelete(`/music/playlists/${userName}/${playlistName}`)
      .then(response => {
        dispatch({
          type: types.DELETE_SERVER_PLAYLIST_SUCCESS,
          playlistName: playlistName
        })
      })
  }
}
