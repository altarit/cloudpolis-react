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
  if (currentIndex < 0) return {isPlaying: type !== types.PLAYER_END}

  let nextIndex = getNextIndexByType(currentIndex, type)
  let track = pl[nextIndex]
  if (!track) return {isPlaying: type !== types.PLAYER_END}

  return {
    track: track,
    isPlaying: true,
    pos: nextIndex
  }
}

function addPlaylist(name, tabs, pls) {
  if (!name) {
    return {error: 'Type something'}
  }
  if (name.length > 32) {
    return {error: 'Too long'}
  }
  if (~tabs.indexOf(name)) {
    return {error: `Playlist ${name} already exists`}
  }
  if (tabs.length >= 20) {
    return {error: `Too many playlists`}
  }

  return {
    tabs: [...tabs, name],
    pls: {...pls, [name]: []},
    openTab: name
  }
}

function excludeOpenPlaylust(openTab, tabs, pls) {
  let index = tabs.indexOf(openTab)
  if (!~index) return

  let nextTabs = [...tabs]
  nextTabs.splice(index, 1)
  let nextPls = {...pls}
  delete nextPls[openTab]
  if (!nextTabs.length) {
    nextTabs.push(types.DEFAULT_PL)
    nextPls[types.DEFAULT_PL] = []
  }
  let nextOpenTab = index < nextTabs.length ? nextTabs[index] : nextTabs[index - 1]
  return {
    tabs: nextTabs,
    pls: nextPls,
    openTab: nextOpenTab
  }
}

function savePlaylistToStorage(state, filename, playlist) {
  let safe = JSON.parse(localStorage.getItem('safePlaylists')) || {}
  let nextPlaylists = {...safe, [filename]: playlist.map(cloneTrack)}
  localStorage.setItem('safePlaylists', JSON.stringify(nextPlaylists))
  return {...state, safePlaylists: nextPlaylists}
}

function openPlaylistFromStorage(state, filename) {
  let safeForOpen = JSON.parse(localStorage.getItem('safePlaylists')) || {}
  let newPl = safeForOpen[filename]
  if (newPl) {
    return {
      ...state,
      pls: {...state.pls, [filename]: newPl},
      tabs: ~state.tabs.indexOf(filename) ? state.tabs : [...state.tabs, filename],
      openTab: filename
    }
  } else {
    console.log(filename + ' not found')
    return state
  }
}

function deletePlaylistFromStorage(state, filename) {
  let safe = JSON.parse(localStorage.getItem('safePlaylists')) || {}
  delete safe[filename]
  localStorage.setItem('safePlaylists', JSON.stringify(safe))
  return {...state, safePlaylists: safe}
}

function cloneTrack(track) {
  return {
    title: track.title,
    artist: track.artist,
    src: (track.src || track.href),
    duration: track.duration,
    compilation: track.compilation
  }
}

function moveTrack(statePls, stateCurrentPl, statePos, oldTrack, plFromName, posFrom, plToName, posTo) {
  console.log(`moveTrack: ${plFromName}:${posFrom} -> ${plToName}:${posTo}`)
  let track = cloneTrack(oldTrack)
  console.log(`${track.title}`)
  let nextPls = {...statePls}
  if (plFromName) {
    let plFrom = [...nextPls[plFromName]]
    if (plFrom) {
      plFrom.splice(posFrom, 1)
      nextPls[plFromName] = plFrom
    }
  }
  // let track = plFrom.splice(posFrom, 1)
  let plTo = [...nextPls[plToName]]
  nextPls[plToName] = plTo
  let offset = (plFromName === plToName && posFrom < posTo) ? -1 : 0
  plTo.splice(posTo + offset, 0, track)

  // move current track marker
  let currentIndex = statePos
  let offsetPos = 0
  if (stateCurrentPl === plFromName && statePos >= posFrom) {
    offsetPos--
  }
  if (stateCurrentPl === plToName && statePos >= posTo) {
    offsetPos++
  }
  let nextIndex = currentIndex + offsetPos
  if (stateCurrentPl === plFromName && statePos === posFrom) {
    nextIndex = posTo + offsetPos
  }

  return {pls: nextPls, pos: nextIndex}
}

function removeTrack(statePls, currentPl, statePos, remPl, remPos) {
  console.log(`removeTrack: ${remPl}:${remPos}`)
  let nextPls = {...statePls}
  let nextPl = [...nextPls[remPl]]
  nextPls[remPl] = nextPl

  nextPl.splice(remPos, 1)
  if (currentPl === remPl) {
    if (remPos < statePos) {
      return {pls: nextPls, pos: statePos - 1, track: nextPl[statePos - 1]}
    } else if (remPos === statePos && nextPl.length > 0) {
      let nextPos = nextPl.length === statePos ? statePos - 1 : statePos
      return {pls: nextPls, pos: nextPos, track: nextPl[nextPos]}
    }
  }
  return {pls: nextPls, pos: statePos, track: nextPls[statePos]}
}

function sortBy(by, pls, openTab, currentPl, pos) {
  let newPls = {...pls}
  let newPl = [...newPls[openTab]]

  let currentTrack
  if (currentPl === openTab) {
    currentTrack = newPl[pos]
  }

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
  newPls[openTab] = newPl

  // change current pos
  let newPos
  if (currentPl === openTab) {
    for (let i = 0; i < newPl.length; i++) {
      if (currentTrack === newPl[i]) {
        newPos = i
      }
    }
    if (newPos === undefined) {
      console.warn(`Can't calculate new current pos number`)
    }
  }

  return {pls: newPls, pos: newPos}
}

function getNextScrolledTabs(tabs, tabName, scrolledTabs) {
  let currentTabIndex = tabs.indexOf(tabName)
  let nextScrolledTabs = scrolledTabs
  if (nextScrolledTabs > currentTabIndex) nextScrolledTabs = currentTabIndex
  if (nextScrolledTabs < currentTabIndex - 2) nextScrolledTabs = currentTabIndex - 2
  return nextScrolledTabs
}

const initialState = {
  isPlaying: false,
  volume: 0.25,
  muted: false,
  track: {
    title: '',
    artist: '',
    src: '',
    duration: ''
  },
  pos: -1,

  tabs: [types.DEFAULT_PL],
  pls: {
    [types.DEFAULT_PL]: []
  },
  currentPl: types.DEFAULT_PL,
  openTab: types.DEFAULT_PL,
  scrolledTabs: 0,

  safePlaylists: {},
  errors: {}
}

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    // general
    case types.PLAYER_PLAY:
      return {...state, isPlaying: state.pos !== -1}
    case types.PLAYER_PAUSE:
      return {...state, isPlaying: false}
    case types.SET_TRACK:
      return {...state, track: action.track, currentPl: action.track.pl, isPlaying: true, pos: action.track.pos}
    case types.PLAYER_NEXT:
      return {...state, ...selectNextTrack(state, action.type)}
    case types.PLAYER_PREV:
      return {...state, ...selectNextTrack(state, action.type)}
    case types.TRACK_ENDS:
      return {...state, ...selectNextTrack(state, action.type)}
    // options
    case types.SET_VOLUME:
      return {...state, volume: action.val, muted: false}
    case types.TOGGLE_MUTE:
      return {...state, muted: !state.muted}
    // management of lists
    case types.UPDATE_PLAYLIST:
      return {
        ...state,
        pls: {...state.pls, [action.name]: action.content},
        tabs: ~state.tabs.indexOf(action.name) ? state.tabs : [...state.tabs, action.name]
      }
    case types.CREATE_PLAYLIST:
      let createPlUpdates = addPlaylist(action.name, state.tabs, state.pls)
      if (createPlUpdates.error) {
        return {...state, errors: {createPlaylist: createPlUpdates.error}}
      }
      return {...state,
        tabs: createPlUpdates.tabs,
        pls: createPlUpdates.pls,
        openTab: createPlUpdates.openTab,
        errors: {}
      }
    case types.CLOSE_OPEN_PLAYLIST:
      let closePlUpdates = excludeOpenPlaylust(state.openTab, state.tabs, state.pls)
      return {...state, tabs: closePlUpdates.tabs, pls: closePlUpdates.pls, openTab: closePlUpdates.openTab}
    case types.CLOSE_OTHER_PLAYLISTS:
      return {
        ...state,
        tabs: [state.openTab],
        pls: {[state.openTab]: state.pls[state.openTab]},
        openTab: state.openTab,
        scrolledTabs: 0
      }
    // storage
    case types.STORAGE_LOAD_PLAYLISTS:
      return {...state, safePlaylists: JSON.parse(localStorage.getItem('safePlaylists')) || {}}
    case types.STORAGE_SAVE_PLAYLIST:
      return {...state, ...savePlaylistToStorage(state, action.filename, action.playlist)}
    case types.STORAGE_OPEN_PLAYLIST:
      return {...state, ...openPlaylistFromStorage(state, action.filename)}
    case types.STORAGE_DELETE_PLAYLIST:
      return {...state, ...deletePlaylistFromStorage(state, action.filename)}
    // editing a playlist
    case types.MOVE_TRACK:
      let moveUpdates = moveTrack(state.pls, state.currentPl, state.pos,
        action.track, action.plFrom, action.posFrom, action.plTo, action.posTo)
      return {...state, pls: moveUpdates.pls, pos: moveUpdates.pos}
    case types.REMOVE_TRACK:
      let removeUpdates = removeTrack(state.pls, state.currentPl, state.pos, action.plName, action.pos)
      return {...state, pls: removeUpdates.pls, pos: removeUpdates.pos, track: removeUpdates.track
      }
    // sort
    case types.SORT_PLAYLIST:
      let sortUpdates = sortBy(action.by, state.pls, state.openTab, state.currentPl, state.pos)
      return {...state, pls: sortUpdates.pls, pos: sortUpdates.pos}
    // tabs
    case types.SELECT_TAB:
      return {
        ...state,
        openTab: action.tabName,
        scrolledTabs: getNextScrolledTabs(state.tabs, action.tabName, state.scrolledTabs)
      }
    case types.SCROLL_LEFT:
      return {...state, scrolledTabs: state.scrolledTabs > 0 ? state.scrolledTabs - 1 : state.scrolledTabs}
    case types.SCROLL_RIGHT:
      return {...state, scrolledTabs: state.scrolledTabs + 1}
  }
  return state
}
