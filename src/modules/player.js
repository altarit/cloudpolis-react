export const PLAYER_PLAY = 'PLAYER_PLAY';
export const PLAYER_PAUSE = 'PLAYER_PAUSE';
export const SET_TRACK = 'SET_TRACK';
export const SELECT_TAB = 'SELECT_TAB'
export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST'
export const SET_CURRENT_PL = 'SET_CURRENT_PL'
export const PLAYER_NEXT = 'PLAYER_NEXT'
export const PLAYER_PREV = 'PLAYER_PREV'
export const PLAYER_END = 'PLAYER_END'
export const CREATE_PLAYLIST = 'CREATE_PLAYLIST'
export const CLOSE_OPEN_PLAYLIST = 'CLOSE_OPEN_PLAYLIST'
export const CLOSE_OTHER_PLAYLISTS = 'CLOSE_OTHER_PLAYLISTS'
export const STORAGE_LOAD_PLAYLISTS = 'STORAGE_LOAD_PLAYLISTS'
export const STORAGE_SAVE_PLAYLISTS = 'STORAGE_SAVE_PLAYLISTS'
export const STORAGE_OPEN_PLAYLIST = 'STORAGE_OPEN_PLAYLIST'
export const STORAGE_DELETE_PLAYLIST = 'STORAGE_DELETE_PLAYLIST'

export const DEFAULT_PL = 'Default'

export function play() {
  return {
    type: PLAYER_PLAY
  }
}

export function pause() {
  return {
    type: PLAYER_PAUSE
  }
}

export function setTrack(track) {
  return {
    type: SET_TRACK,
    payload: track
  }
}

export function selectTab(playlistName) {
  return {
    type: SELECT_TAB,
    payload: playlistName
  }
}

export function updatePlaylist(name, content) {
  return {
    type: UPDATE_PLAYLIST,
    name: name || DEFAULT_PL,
    content: content
  }
}

export function setCurrentPlaylist(name) {
  return {
    type: SET_CURRENT_PL,
    name: name || DEFAULT_PL
  }
}

export function nextTrack() {
  return {
    type: PLAYER_NEXT
  }
}

export function prevTrack() {
  return {
    type: PLAYER_PREV
  }
}

export function endTrack() {
  return {
    type: PLAYER_END
  }
}

export function createPlaylist(name) {
  return {
    type: CREATE_PLAYLIST,
    name
  }
}

export function closeOpenPlaylist() {
  return {
    type: CLOSE_OPEN_PLAYLIST
  }
}

export function closeOtherPlaylists() {
  return {
    type: CLOSE_OTHER_PLAYLISTS
  }
}

export function loadPlaylistsFromStorage() {
  return {
    type: STORAGE_LOAD_PLAYLISTS
  }
}

export function savePlaylistsToStorage(filename, playlist) {
  return {
    type: STORAGE_SAVE_PLAYLISTS,
    filename,
    playlist
  }
}

export function openPlaylistFromStorage(filename) {
  return {
    type: STORAGE_OPEN_PLAYLIST,
    filename
  }
}

export function deletePlaylistFromStorage(filename) {
  return {
    type: STORAGE_DELETE_PLAYLIST,
    filename
  }
}

export const actions = {
  nextTrack,
  prevTrack,
  actions
};

function getCurrentTrackIndex(player) {
  let pl = player.pls[player.currentPl]
  if (!pl) return -1

  for (let i = 0; i < pl.length; i++) {
    let track = pl[i]
    if ((track.src || track.href) == (player.track.src || player.track.href)) {
      return i
    }
  }

  return -1
}

function getTrackByActionType(player, currentIndex, type) {
  let pl = player.pls[player.currentPl]
  if (!pl) return null

  switch (type) {
    case PLAYER_NEXT:
    case PLAYER_END:
      return pl[currentIndex + 1]
    case PLAYER_PREV:
      return pl[currentIndex - 1]
  }
  return null
}

function selectNextTrack(player, type) {

  let currentIndex = getCurrentTrackIndex(player)
  if (currentIndex < 0) return {isPlayed: type != PLAYER_END}

  let track = getTrackByActionType(player, currentIndex, type)
  if (!track) return {isPlayed: type != PLAYER_END}

  return {
    track: track,
    isPlayed: true
  }
}

function addPlaylist(name, plKeys, pls) {
  if (!name) return {
    errors: {createPlaylist: 'Type something'}
  }
  if (name.length > 32) return {
    errors: {createPlaylist: 'Too long'}
  }
  if (~plKeys.indexOf(name)) return {
    errors: {createPlaylist: `Playlist ${name} already exists`}
  }
  if (plKeys.length >= 32) return {
    errors: {createPlaylist: `Too many playlists`}
  }

  return {
    plKeys: [...plKeys, name],
    pls: {...pls, [name]: []},
    plTab: name,
    errors: {}
  }
}

function excludeOpenPlaylust(plTab, plKeys, pls) {
  let index = plKeys.indexOf(plTab)
  if (!~index) return

  let nextPlKeys = [...plKeys]
  nextPlKeys.splice(index, 1)
  let nextPls = {...pls}
  delete nextPls[plTab]
  if (!nextPlKeys.length) {
    nextPlKeys.push(DEFAULT_PL)
    nextPls[DEFAULT_PL] = []
  }
  let nextPlTab = index < nextPlKeys.length ? nextPlKeys[index] : nextPlKeys[index - 1]
  return {
    plKeys: nextPlKeys,
    pls: nextPls,
    plTab: nextPlTab
  }
}

function _savePlaylistToStorage(state, filename, playlist) {
  let safe = JSON.parse(localStorage.getItem('safePlaylists')) || {}
  let nextPlaylists = {...safe, [filename]: playlist}
  localStorage.setItem('safePlaylists', JSON.stringify(nextPlaylists))
  return {...state, safePlaylists: nextPlaylists}
}

function _openPlaylistFromStorage(state, filename) {
  let safeForOpen = JSON.parse(localStorage.getItem('safePlaylists')) || {}
  let newPl = safeForOpen[filename]
  if (newPl) {
    return {
      ...state,
      pls: {...state.pls, [filename]: newPl},
      plKeys: ~state.plKeys.indexOf(filename) ? state.plKeys : [...state.plKeys, filename],
      plTab: filename
    }
  } else {
    console.log(filename + ' not found')
    return state
  }
}

function _deletePlaylistFromStorage(state, filename) {
  let safe = JSON.parse(localStorage.getItem('safePlaylists')) || {}
  delete safe[filename]
  localStorage.setItem('safePlaylists', JSON.stringify(safe))
  return {...state, safePlaylists: safe}
}

const initialState = {
  isPlayed: false,
  track: {
    title: "",
    artist: "",
    src: "",
    duration: ""
  },
  plTab: DEFAULT_PL,
  currentPl: DEFAULT_PL,
  plKeys: [DEFAULT_PL],
  pls: {
    [DEFAULT_PL]: []
  },
  safePlaylists: {},
  errors: {}
}

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYER_PLAY:
      return {...state, isPlayed: !!state.track.title};
    case PLAYER_PAUSE:
      return {...state, isPlayed: false};
    case SET_TRACK:
      return {...state, track: action.payload, currentPl: action.payload.pl, isPlayed: true};
    case SELECT_TAB:
      return {...state, plTab: action.payload};
    case UPDATE_PLAYLIST:
      return {
        ...state,
        pls: {...state.pls, [action.name]: action.content},
        plKeys: ~state.plKeys.indexOf(action.name) ? state.plKeys : [...state.plKeys, action.name]
      };
    case SET_CURRENT_PL:
      return {...state, currentPl: action.name}
    case PLAYER_NEXT:
      return {...state, ...selectNextTrack(state, action.type)}
    case PLAYER_PREV:
      return {...state, ...selectNextTrack(state, action.type)}
    case PLAYER_END:
      return {...state, ...selectNextTrack(state, action.type)}
    case CREATE_PLAYLIST:
      return {...state, ...addPlaylist(action.name, state.plKeys, state.pls)}
    case CLOSE_OPEN_PLAYLIST:
      return {...state, ...excludeOpenPlaylust(state.plTab, state.plKeys, state.pls)}
    case CLOSE_OTHER_PLAYLISTS:
      return {...state, plKeys: [state.plTab], pls: {[state.plTab]: state.pls[state.plTab]}}
    case STORAGE_LOAD_PLAYLISTS:
      return {...state, safePlaylists: JSON.parse(localStorage.getItem('safePlaylists')) || {}}
    case STORAGE_SAVE_PLAYLISTS:
      return {...state, ..._savePlaylistToStorage(state, action.filename, action.playlist)}
    case STORAGE_OPEN_PLAYLIST:
      return {...state, ..._openPlaylistFromStorage(state, action.filename)}
    case STORAGE_DELETE_PLAYLIST:
      return {...state, ..._deletePlaylistFromStorage(state, action.filename)}
  }
  return state;
}
