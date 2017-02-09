export const PLAYER_PLAY = 'PLAYER_PLAY'
export const PLAYER_PAUSE = 'PLAYER_PAUSE'
export const SET_TRACK = 'SET_TRACK'
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
export const SET_VOLUME = 'SET_VOLUME'
export const TOGGLE_MUTE = 'TOGGLE_MUTE'
export const MOVE_TRACK = 'MOVE_TRACK'
export const REMOVE_TRACK = 'REMOVE_TRACK'
export const SORT_PLAYLIST = 'SORT_PLAYLIST'
export const SCROLL_LEFT = 'SCROLL_LEFT'
export const SCROLL_RIGHT = 'SCROLL_RIGHT'

export const DEFAULT_PL = 'Default'
export const ARTIST_PL = '__Artist__'
export const SEARCH_PL = '__Search__'

export const BY_TITLE = 'BY_TITLE'
export const BY_ARTIST = 'BY_ARTIST'
export const BY_DURATION = 'BY_DURATION'
export const BY_PATH = 'BY_PATH'
export const SHUFFLE = 'SHUFFLE'
export const REVERSE = 'REVERSE'

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
    content: [...content]
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

export function setVolume(val) {
  return {
    type: SET_VOLUME,
    val
  }
}

export function toggleMute() {
  return {
    type: TOGGLE_MUTE
  }
}

export function moveTrack(track, plFrom, posFrom, plTo, posTo) {
  return {
    type: MOVE_TRACK,
    track,
    plFrom,
    posFrom,
    plTo,
    posTo
  }
}

export function removeTrack(plName, pos) {
  return {
    type: REMOVE_TRACK,
    plName,
    pos
  }
}

export function sortByTitle() {
  return {
    type: SORT_PLAYLIST,
    by: BY_TITLE
  }
}
export function sortByArtist() {
  return {
    type: SORT_PLAYLIST,
    by: BY_ARTIST
  }
}
export function sortByDuration() {
  return {
    type: SORT_PLAYLIST,
    by: BY_DURATION
  }
}
export function sortByPath() {
  return {
    type: SORT_PLAYLIST,
    by: BY_PATH
  }
}
export function shuffle() {
  return {
    type: SORT_PLAYLIST,
    by: SHUFFLE
  }
}
export function reverse() {
  return {
    type: SORT_PLAYLIST,
    by: REVERSE
  }
}

export function scrollLeft() {
  return {
    type: SCROLL_LEFT
  }
}

export function scrollRight() {
  return {
    type: SCROLL_RIGHT
  }
}

export const actions = {
  nextTrack,
  prevTrack,
  actions
}

/* isn't used
 function getCurrentTrackIndex (player) {
 let pl = player.pls[player.currentPl]
 if (!pl) return -1

 return player.pos

 for (let i = 0; i < pl.length; i++) {
 let track = pl[i]
 if ((track.src || track.href) === (player.track.src || player.track.href)) {
 return i
 }
 }

 return -1
 }

 function getTrackByActionType (player, currentIndex, type) {
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
 } */

function getNextIndexByType(currentIndex, type) {
  switch (type) {
    case PLAYER_NEXT:
    case PLAYER_END:
      return currentIndex + 1
    case PLAYER_PREV:
      return currentIndex - 1
  }
  return null
}

function selectNextTrack(player, type) {
  let pl = player.pls[player.currentPl]
  if (!pl) return null

  let currentIndex = player.pos
  // let currentIndex = getCurrentTrackIndex(player)
  if (currentIndex < 0) return {isPlayed: type !== PLAYER_END}

  let nextIndex = getNextIndexByType(currentIndex, type)
  let track = pl[nextIndex]
  // let track = getTrackByActionType(player, currentIndex, type)
  if (!track) return {isPlayed: type !== PLAYER_END}

  return {
    track: track,
    isPlayed: true,
    pos: nextIndex
  }
}

function addPlaylist(name, plKeys, pls) {
  if (!name) {
    return {
      errors: {createPlaylist: 'Type something'}
    }
  }
  if (name.length > 32) {
    return {
      errors: {createPlaylist: 'Too long'}
    }
  }
  if (~plKeys.indexOf(name)) {
    return {
      errors: {createPlaylist: `Playlist ${name} already exists`}
    }
  }
  console.log('Too many playlists: ' + plKeys.length)
  if (plKeys.length >= 20) {
    return {
      errors: {createPlaylist: `Too many playlists`}
    }
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
  let nextPlaylists = {...safe, [filename]: playlist.map(_cloneTrack)}
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
  volume: 0.25,
  muted: false,
  track: {
    title: '',
    artist: '',
    src: '',
    duration: ''
  },
  pos: 0,
  plTab: DEFAULT_PL,
  scrolledTabs: 0,
  currentPl: DEFAULT_PL,
  plKeys: [DEFAULT_PL],
  pls: {
    [DEFAULT_PL]: []
  },
  safePlaylists: {},
  errors: {}
}

function _cloneTrack(track) {
  return {
    title: track.title,
    artist: track.artist,
    src: (track.src || track.href),
    duration: track.duration,
    compilation: track.compilation
  }
}

function _moveTrack(state, oldTrack, plFromName, posFrom, plToName, posTo) {
  console.log(`_moveTrack: ${plFromName}:${posFrom} -> ${plToName}:${posTo}`)
  let track = _cloneTrack(oldTrack)
  console.log(`${track.title}`)
  let pls = {...state.pls}
  if (plFromName) {
    let plFrom = [...pls[plFromName]]
    if (plFrom) {
      plFrom.splice(posFrom, 1)
      pls[plFromName] = plFrom
    }
  }
  // let track = plFrom.splice(posFrom, 1)
  let plTo = [...pls[plToName]]
  pls[plToName] = plTo
  let offset = (plFromName === plToName && posFrom < posTo) ? -1 : 0
  plTo.splice(posTo + offset, 0, track)

  // move current track marker
  let currentIndex = state.pos
  let offsetPos = 0
  if (state.currentPl === plFromName && state.pos >= posFrom) {
    offsetPos--
  }
  if (state.currentPl === plToName && state.pos >= posTo) {
    offsetPos++
  }
  let nextIndex = currentIndex + offsetPos
  if (state.currentPl === plFromName && state.pos === posFrom) {
    nextIndex = posTo + offsetPos
  }

  return {pls, pos: nextIndex}
}

function _removeTrack(state, plName, pos) {
  console.log(`_removeTrack: ${plName}:${pos}`)
  let pls = {...state.pls}
  let plNext = pls[plName]
  plNext.splice(pos, 1)
  if (pos < state.pos) {
    return {pls, pos: state.pos - 1}
  } else if (pos === state.pos && plNext.length > 0) {
    let nextPos = plNext.length === state.pos ? state.pos - 1 : state.pos
    return {pls, pos: nextPos, track: plNext[nextPos]}
  }
  return {pls}
}

function _sortBy(state, by) {
  let newPls = {...state.pls}
  let newPl = [...newPls[state.plTab]]

  switch (by) {
    case BY_TITLE:
      newPl.sort((a, b) => a.title.localeCompare(b.title))
      break
    case BY_ARTIST:
      newPl.sort((a, b) => a.artist.localeCompare(b.artist))
      break
    case BY_DURATION:
      newPl.sort((a, b) => a.duration.localeCompare(b.duration))
      break
    case BY_PATH:
      newPl.sort((a, b) => (a.src || a.href).localeCompare(b.src || b.href))
      break
    case SHUFFLE:
      let j, temp
      for (let i = newPl.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        temp = newPl[j]
        newPl[j] = newPl[i]
        newPl[i] = temp
      }
      break
    case REVERSE:
      newPl.reverse()
      break
  }
  newPls[state.plTab] = newPl

  // change current pos
  let newPos = state.pos
  if (state.currentPl === state.plTab) {
    for (let i = 0; i < newPl.length; i++) {
      let track = newPl[i]
      if ((track.href || track.src) === (state.track.href || state.track.src) && track.title === state.track.title) {
        newPos = i
      }
    }
  }

  return {pls: newPls, pos: newPos}
}

function _getNextScrolledTabs(tabs, tabName, scrolledTabs) {
  let currentTabIndex = tabs.indexOf(tabName)
  let nextScrolledTabs = scrolledTabs
  if (nextScrolledTabs > currentTabIndex) nextScrolledTabs = currentTabIndex
  if (nextScrolledTabs < currentTabIndex - 2) nextScrolledTabs = currentTabIndex - 2
  return nextScrolledTabs
}

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYER_PLAY:
      return {...state, isPlayed: !!state.track.title}
    case PLAYER_PAUSE:
      return {...state, isPlayed: false}
    case SET_TRACK:
      return {...state, track: action.payload, currentPl: action.payload.pl, isPlayed: true, pos: action.payload.pos}
    case SELECT_TAB:
      return {
        ...state,
        plTab: action.payload,
        scrolledTabs: _getNextScrolledTabs(state.plKeys, action.payload, state.scrolledTabs)
      }
    case UPDATE_PLAYLIST:
      return {
        ...state,
        pls: {...state.pls, [action.name]: action.content},
        plKeys: ~state.plKeys.indexOf(action.name) ? state.plKeys : [...state.plKeys, action.name]
      }
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
      return {
        ...state,
        plKeys: [state.plTab],
        pls: {[state.plTab]: state.pls[state.plTab]},
        plTab: state.plTab,
        scrolledTabs: 0
      }
    case STORAGE_LOAD_PLAYLISTS:
      return {...state, safePlaylists: JSON.parse(localStorage.getItem('safePlaylists')) || {}}
    case STORAGE_SAVE_PLAYLISTS:
      return {...state, ..._savePlaylistToStorage(state, action.filename, action.playlist)}
    case STORAGE_OPEN_PLAYLIST:
      return {...state, ..._openPlaylistFromStorage(state, action.filename)}
    case STORAGE_DELETE_PLAYLIST:
      return {...state, ..._deletePlaylistFromStorage(state, action.filename)}
    case SET_VOLUME:
      return {...state, volume: action.val}
    case TOGGLE_MUTE:
      return {...state, muted: !state.muted}
    case MOVE_TRACK:
      return {...state, ..._moveTrack(state, action.track, action.plFrom, action.posFrom, action.plTo, action.posTo)}
    case REMOVE_TRACK:
      return {...state, ..._removeTrack(state, action.plName, action.pos)}
    case SORT_PLAYLIST:
      return {...state, ..._sortBy(state, action.by)}
    case SCROLL_LEFT:
      return {...state, scrolledTabs: state.scrolledTabs > 0 ? state.scrolledTabs - 1 : state.scrolledTabs}
    case SCROLL_RIGHT:
      return {...state, scrolledTabs: state.scrolledTabs + 1}
  }
  return state
}
