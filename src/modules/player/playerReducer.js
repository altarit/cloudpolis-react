import * as types from './playerConstants'

function getNextIndexByType(currentIndex, type) {
  switch (type) {
    case types.PLAYER_NEXT:
    case types.PLAYER_END:
      return currentIndex + 1
    case types.PLAYER_PREV:
      return currentIndex - 1
  }
  return null
}

function selectNextTrack(player, type) {
  let pl = player.pls[player.currentPl]
  if (!pl) return null

  let currentIndex = player.pos
  // let currentIndex = getCurrentTrackIndex(player)
  if (currentIndex < 0) return {isPlayed: type !== types.PLAYER_END}

  let nextIndex = getNextIndexByType(currentIndex, type)
  let track = pl[nextIndex]
  // let track = getTrackByActionType(player, currentIndex, type)
  if (!track) return {isPlayed: type !== types.PLAYER_END}

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
    nextPlKeys.push(types.DEFAULT_PL)
    nextPls[types.DEFAULT_PL] = []
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
  plTab: types.DEFAULT_PL,
  scrolledTabs: 0,
  currentPl: types.DEFAULT_PL,
  plKeys: [types.DEFAULT_PL],
  pls: {
    [types.DEFAULT_PL]: []
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
    case types.BY_TITLE:
      newPl.sort((a, b) => a.title.localeCompare(b.title))
      break
    case types.BY_ARTIST:
      newPl.sort((a, b) => a.artist.localeCompare(b.artist))
      break
    case types.BY_DURATION:
      newPl.sort((a, b) => a.duration.localeCompare(b.duration))
      break
    case types.BY_PATH:
      newPl.sort((a, b) => (a.src || a.href).localeCompare(b.src || b.href))
      break
    case types.SHUFFLE:
      let j, temp
      for (let i = newPl.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        temp = newPl[j]
        newPl[j] = newPl[i]
        newPl[i] = temp
      }
      break
    case types.REVERSE:
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
    case types.PLAYER_PLAY:
      return {...state, isPlayed: !!state.track.title}
    case types.PLAYER_PAUSE:
      return {...state, isPlayed: false}
    case types.SET_TRACK:
      return {...state, track: action.payload, currentPl: action.payload.pl, isPlayed: true, pos: action.payload.pos}
    case types.SELECT_TAB:
      return {
        ...state,
        plTab: action.payload,
        scrolledTabs: _getNextScrolledTabs(state.plKeys, action.payload, state.scrolledTabs)
      }
    case types.UPDATE_PLAYLIST:
      return {
        ...state,
        pls: {...state.pls, [action.name]: action.content},
        plKeys: ~state.plKeys.indexOf(action.name) ? state.plKeys : [...state.plKeys, action.name]
      }
    case types.SET_CURRENT_PL:
      return {...state, currentPl: action.name}
    case types.PLAYER_NEXT:
      return {...state, ...selectNextTrack(state, action.type)}
    case types.PLAYER_PREV:
      return {...state, ...selectNextTrack(state, action.type)}
    case types.PLAYER_END:
      return {...state, ...selectNextTrack(state, action.type)}
    case types.CREATE_PLAYLIST:
      return {...state, ...addPlaylist(action.name, state.plKeys, state.pls)}
    case types.CLOSE_OPEN_PLAYLIST:
      return {...state, ...excludeOpenPlaylust(state.plTab, state.plKeys, state.pls)}
    case types.CLOSE_OTHER_PLAYLISTS:
      return {
        ...state,
        plKeys: [state.plTab],
        pls: {[state.plTab]: state.pls[state.plTab]},
        plTab: state.plTab,
        scrolledTabs: 0
      }
    case types.STORAGE_LOAD_PLAYLISTS:
      return {...state, safePlaylists: JSON.parse(localStorage.getItem('safePlaylists')) || {}}
    case types.STORAGE_SAVE_PLAYLISTS:
      return {...state, ..._savePlaylistToStorage(state, action.filename, action.playlist)}
    case types.STORAGE_OPEN_PLAYLIST:
      return {...state, ..._openPlaylistFromStorage(state, action.filename)}
    case types.STORAGE_DELETE_PLAYLIST:
      return {...state, ..._deletePlaylistFromStorage(state, action.filename)}
    case types.SET_VOLUME:
      return {...state, volume: action.val}
    case types.TOGGLE_MUTE:
      return {...state, muted: !state.muted}
    case types.MOVE_TRACK:
      return {...state, ..._moveTrack(state, action.track, action.plFrom, action.posFrom, action.plTo, action.posTo)}
    case types.REMOVE_TRACK:
      return {...state, ..._removeTrack(state, action.plName, action.pos)}
    case types.SORT_PLAYLIST:
      return {...state, ..._sortBy(state, action.by)}
    case types.SCROLL_LEFT:
      return {...state, scrolledTabs: state.scrolledTabs > 0 ? state.scrolledTabs - 1 : state.scrolledTabs}
    case types.SCROLL_RIGHT:
      return {...state, scrolledTabs: state.scrolledTabs + 1}
  }
  return state
}
