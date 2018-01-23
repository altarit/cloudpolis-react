import * as types from './storageConstants'
import {fetchGet, fetchPut, fetchDelete} from '../../apiUtils'
import {cloneTrack} from '../playerUtils'
import {getTabIndexByName} from '../playerReducer'
import {openConfirmation} from '../../popups'

// Local Storage

export function selectOpenDialogLocalTab(isLocal) {
  return {
    type: types.OPEN_PLAYLIST_DIALOG_SELECT_LOCAL_TAB,
    isLocal
  }
}

export function loadPlaylistsFromStorage() {
  let safePlaylists = []
  try {
    safePlaylists = JSON.parse(localStorage.getItem('safePlaylists')) || []
  } catch (e) {
    console.warn(`Local storage 'safePlaylists' cannot be read`)
    safePlaylists = []
  }
  return {
    type: types.STORAGE_LOAD_PLAYLISTS_SUCCESS,
    safePlaylists
  }
}

export function savePlaylistToStorage(filename, playlist) {
  let safePlaylists = []
  try {
    safePlaylists = JSON.parse(localStorage.getItem('safePlaylists')) || []
  } catch (e) {
    console.warn(`Local storage 'safePlaylists' cannot be read`)
  }
  let nextPlaylists = [...safePlaylists]
  let index = getTabIndexByName(nextPlaylists, filename)
  if (index >= 0) {
    nextPlaylists[index] = {name: filename, tracks: playlist.tracks.map(cloneTrack)}
  } else {
    nextPlaylists[nextPlaylists.length] = {name: filename, tracks: playlist.tracks.map(cloneTrack)}
  }

  const saveAction = {
    type: types.STORAGE_SAVE_PLAYLIST_SUCCESS,
    safePlaylists: nextPlaylists
  }

  if (index >= 0) {
    return openConfirmation(`File ${filename} already exists. Rewrite?`, 'Yes', 'No', saveAction)
  } else {
    return saveAction
  }
}

export function openPlaylistFromStorage(filename, tabs) {
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
    const tabIndex = getTabIndexByName(tabs, filename)
    let nextTabs = [...tabs]
    if (tabIndex >= 0) {
      nextTabs[tabIndex] = playlist
    } else {
      nextTabs[tabs.length] = playlist
    }
    const openPlaylistAction = {type: types.STORAGE_OPEN_PLAYLIST_SUCCESS, playlist, nextTabs}
    if (tabIndex >= 0) {
      return openConfirmation(`Tab ${filename} already open. Open anyway?`, 'Yes', 'No', openPlaylistAction)
    } else {
      return openPlaylistAction
    }
  } else {
    console.error(`Playlist '${filename}' not found`)
    return null
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
      const deletePlaylistAction = {type: types.STORAGE_DELETE_PLAYLIST_SUCCESS, safePlaylists}
      dispatch(openConfirmation(`Delete file ${filename}?`, 'Yes', 'No', deletePlaylistAction))
    } else {
      console.error(`Playlist '${filename}' not found`)
    }
  }
}

// Server Storage

export function openServerPlaylist(filename, tabs, serverPlaylists) {
  const serverIndex = getTabIndexByName(serverPlaylists, filename)
  const playlist = serverPlaylists[serverIndex]

  const tabIndex = getTabIndexByName(tabs, filename)
  let nextTabs = [...tabs]
  if (tabIndex >= 0) {
    nextTabs[tabIndex] = playlist
  } else {
    nextTabs[tabs.length] = playlist
  }

  const openPlaylistAction = {type: types.STORAGE_SERVER_OPEN_PLAYLIST, filename: filename, nextTabs}
  if (tabIndex >= 0) {
    return openConfirmation(`Tab ${filename} already exists. Open anyway?`, 'Yes', 'No', openPlaylistAction)
  } else {
    return openPlaylistAction
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
