import * as types from './storageConstants'
import {fetchGet, fetchPut, fetchDelete} from '../../apiUtils'
import {cloneTrack} from '../playerUtils'
import {getTabIndexByName} from '../playerReducer'

// Local Storage

export function selectOpenDialogLocalTab(isLocal) {
  return {
    type: types.OPEN_PLAYLIST_DIALOG_SELECT_LOCAL_TAB,
    isLocal
  }
}

export function loadPlaylistsFromStorage() {
  return dispatch => {
    let safePlaylists = []
    try {
      safePlaylists = JSON.parse(localStorage.getItem('safePlaylists')) || []
    } catch (e) {
      console.warn(`Local storage 'safePlaylists' cannot be read`)
      safePlaylists = []
    }
    dispatch({
      type: types.STORAGE_LOAD_PLAYLISTS_SUCCESS,
      safePlaylists
    })
  }
}

export function savePlaylistToStorage(filename, playlist) {
  return dispatch => {
    let safePlaylists = []
    try {
      safePlaylists = JSON.parse(localStorage.getItem('safePlaylists')) || []
    } catch (e) {
      console.warn(`Local storage 'safePlaylists' cannot be read`)
    }
    let nextPlaylists = [...safePlaylists, {name: filename, tracks: playlist.tracks.map(cloneTrack)}]
    localStorage.setItem('safePlaylists', JSON.stringify(nextPlaylists))
    dispatch({
      type: types.STORAGE_SAVE_PLAYLIST_SUCCESS,
      safePlaylists: nextPlaylists
    })
  }
}

export function openPlaylistFromStorage(filename) {
  return dispatch => {
    let safePlaylists = []
    try {
      safePlaylists = JSON.parse(localStorage.getItem('safePlaylists')) || {}
    } catch (e) {
      console.warn(`Local storage 'safePlaylists' cannot be read`)
    }

    const index = getTabIndexByName(safePlaylists, filename)
    let playlist = safePlaylists[index]
    playlist.tracks = playlist.tracks.map(cloneTrack)
    if (playlist) {
      dispatch({
        type: types.STORAGE_OPEN_PLAYLIST_SUCCESS,
        playlist
      })
    } else {
      console.error(`Playlist '${filename}' not found`)
    }
  }
}

export function deletePlaylistFromStorage(filename) {
  return dispatch => {
    let safePlaylists = []
    try {
      safePlaylists = JSON.parse(localStorage.getItem('safePlaylists')) || []
    } catch (e) {
      console.warn(`Local storage 'safePlaylists' cannot be read`)
    }
    const index = getTabIndexByName(safePlaylists, filename)
    let playlist = safePlaylists[index]
    if (playlist) {
      safePlaylists.splice(index, 1)
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
    filename: playlistName
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
          playlists: response.data.playlists.map(playlist => ({
            name: playlist.name,
            tracks: playlist.tracks.map(cloneTrack)
          }))
        })
      })
  }
}

export function putServerPlaylist(userName, filename, playlist) {
  return (dispatch) => {
    dispatch({
      type: types.PUT_SERVER_PLAYLIST_REQUEST
    })

    let params = {
      body: JSON.stringify({playlist: playlist})
    }
    return fetchPut(`/music/playlists/${userName}/${filename}`, params)
      .then(response => {
        dispatch({
          type: types.PUT_SERVER_PLAYLIST_SUCCESS,
          playlist: {...playlist, name: filename},
          filename: filename
        })
      })
  }
}

export function deleteServerPlaylist(userName, filename) {
  return (dispatch) => {
    dispatch({
      type: types.DELETE_SERVER_PLAYLIST_REQUEST
    })

    return fetchDelete(`/music/playlists/${userName}/${filename}`)
      .then(response => {
        dispatch({
          type: types.DELETE_SERVER_PLAYLIST_SUCCESS,
          filename: filename
        })
      })
  }
}
