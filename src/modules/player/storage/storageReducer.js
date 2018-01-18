import * as types from './storageConstants'

const ACTION_HANDLERS = {
  // local ones
  [types.OPEN_PLAYLIST_DIALOG_SELECT_LOCAL_TAB]: (state, action) => {
    return {...state, isLocal: action.isLocal}
  },
  [types.STORAGE_LOAD_PLAYLISTS_SUCCESS]: (state, action) => {
    return {...state, safePlaylists: action.safePlaylists}
  },
  [types.STORAGE_SAVE_PLAYLIST_SUCCESS]: (state, action) => {
    return {...state, safePlaylists: action.safePlaylists}
  },
  [types.STORAGE_OPEN_PLAYLIST_SUCCESS]: (state, action) => {
    let nextPls = {...state.tabs, [action.filename]: action.playlist}
    let nextTabs = ~state.tabs.indexOf(action.filename) ? state.tabs : [...state.tabs, action.filename]
    return {...state, tabs: nextPls, tabs: nextTabs, openTab: action.filename}
  },
  [types.STORAGE_DELETE_PLAYLIST_SUCCESS]: (state, action) => {
    return {...state, safePlaylists: action.safePlaylists}
  },
  // server ones
  [types.STORAGE_SERVER_OPEN_PLAYLIST]: (state, action) => {
    let serverPlIndex = state.serverPlaylists.find(el => el.name === action.name)
    let nextPls = {...state.tabs, [action.name]: serverPlIndex.tracks}
    let nextTabs = ~state.tabs.indexOf(action.name) ? state.tabs : [...state.tabs, action.name]
    return {...state, tabs: nextPls, tabs: nextTabs, openTab: action.name}
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
    let serverPlIndex = state.serverPlaylists.findIndex(el => el.name === action.name)
    if (~serverPlIndex) {
      nextServerPlaylists[serverPlIndex] = action.playlist
    } else {
      nextServerPlaylists.push(action.playlist)
    }
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
    let serverPlIndex = state.serverPlaylists.findIndex(el => el.name === action.name)
    if (~serverPlIndex) {
      nextServerPlaylists.splice(serverPlIndex, 1)
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
