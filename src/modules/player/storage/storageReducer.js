import * as types from './storageConstants'
import {getTabIndexByName} from '../playerReducer'

const ACTION_HANDLERS = {
  // local ones
  [types.OPEN_PLAYLIST_DIALOG_SELECT_LOCAL_TAB]: (state, action) => {
    return {...state, isLocal: action.isLocal}
  },
  [types.STORAGE_LOAD_PLAYLISTS_SUCCESS]: (state, action) => {
    return {...state, safePlaylists: action.safePlaylists}
  },
  [types.STORAGE_SAVE_PLAYLIST_SUCCESS]: (state, action) => {
    localStorage.setItem('safePlaylists', JSON.stringify(action.safePlaylists))
    return {...state, safePlaylists: action.safePlaylists}
  },
  [types.STORAGE_OPEN_PLAYLIST_SUCCESS]: (state, action) => {
    return {...state, tabs: action.nextTabs, openTab: action.playlist.name}
  },
  [types.STORAGE_DELETE_PLAYLIST_SUCCESS]: (state, action) => {
    localStorage.setItem('safePlaylists', JSON.stringify(action.safePlaylists))
    return {...state, safePlaylists: action.safePlaylists}
  },
  // server ones
  [types.STORAGE_SERVER_OPEN_PLAYLIST]: (state, action) => {
    return {...state, tabs: action.nextTabs, openTab: action.filename}
  },
  [types.GET_SERVER_PLAYLISTS_REQUEST]: (state, action) => {
    return {...state}
  },
  [types.GET_SERVER_PLAYLISTS_SUCCESS]: (state, action) => {
    return {...state, serverPlaylists: action.playlists}
  },
  [types.GET_SERVER_PLAYLISTS_FAILED]: (state, action) => {
    return {...state}
  },
  [types.PUT_SERVER_PLAYLIST_REQUEST]: (state, action) => {
    return {...state}
  },
  [types.PUT_SERVER_PLAYLIST_SUCCESS]: (state, action) => {
    let nextServerPlaylists = [...state.serverPlaylists]
    let serverIndex = getTabIndexByName(nextServerPlaylists, action.filename)
    if (!~serverIndex) {
      serverIndex = nextServerPlaylists.length
    }
    nextServerPlaylists[serverIndex] = action.playlist
    return {...state, serverPlaylists: nextServerPlaylists}
  },
  [types.PUT_SERVER_PLAYLIST_FAILED]: (state, action) => {
    return {...state}
  },
  [types.DELETE_SERVER_PLAYLIST_REQUEST]: (state, action) => {
    return {...state}
  },
  [types.DELETE_SERVER_PLAYLIST_SUCCESS]: (state, action) => {
    let nextServerPlaylists = [...state.serverPlaylists]
    let serverIndex = getTabIndexByName(nextServerPlaylists, action.filename)
    if (~serverIndex) {
      nextServerPlaylists.splice(serverIndex, 1)
    }
    return {...state, serverPlaylists: nextServerPlaylists}
  },
  [types.DELETE_SERVER_PLAYLIST_FAILED]: (state, action) => {
    return {...state}
  },
}

export default function playerLocalStorageReducer(state, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
