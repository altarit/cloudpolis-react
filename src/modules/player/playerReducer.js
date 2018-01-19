import * as types from './playerConstants'
import {cloneTrack, setTitle} from './playerUtils'
import playerLocalStorageReducer from './storage/storageReducer'

export function getTabIndexByName(tabs, tabName) {
  const result = tabs.findIndex(tab => tab.name === tabName)
  return result === undefined ? -1 : result
}

function getNextIndexByType(currentIndex, type) {
  switch (type) {
    case types.PLAYER_NEXT:
    case types.TRACK_ENDS:
      return currentIndex + 1
    case types.PLAYER_PREV:
      return currentIndex - 1
  }
}

function selectNextTrack(tab, pos, type) {
  if (!tab) return {}

  let currentIndex = pos
  if (currentIndex < 0) return {isPlaying: type !== types.TRACK_ENDS}

  let nextIndex = getNextIndexByType(currentIndex, type)
  let track = tab.tracks[nextIndex]
  if (!track) return {isPlaying: type !== types.TRACK_ENDS}

  return {
    track: track,
    isPlaying: true,
    pos: nextIndex
  }
}

function addPlaylist(name, tabs) {
  if (!name) {
    return {error: 'Type something'}
  }
  if (name.length > 32) {
    return {error: 'Too long'}
  }
  const index = getTabIndexByName(tabs, name)
  if (~index) {
    return {error: `Playlist ${name} already exists`}
  }
  if (tabs.length >= 20) {
    return {error: `Too many playlists`}
  }

  return {
    tabs: [...tabs, {name: name, content: []}],
    openTab: name
  }
}

function excludeOpenPlaylust(openTab, tabs) {
  let index = getTabIndexByName(tabs, openTab)
  if (!~index) return

  let nextTabs = [...tabs]
  nextTabs.splice(index, 1)
  if (!nextTabs.length) {
    nextTabs.push({name: types.DEFAULT_PL, tracks: []})
  }
  let nextOpenTab = index < nextTabs.length ? nextTabs[index].name : nextTabs[index - 1].name
  return {
    tabs: nextTabs,
    openTab: nextOpenTab
  }
}

function moveTrack(stateTabs, stateCurrentTab, statePos, oldTrack, tabFromName, posFrom, tabToName, posTo) {
  console.log(`moveTrack: ${tabFromName}:${posFrom} -> ${tabToName}:${posTo}`)
  let track = cloneTrack(oldTrack)
  console.log(`${track.title}`)
  const nextTabs = [...stateTabs]
  if (tabFromName) {
    const tabFromIndex = getTabIndexByName(nextTabs, tabFromName)
    if (!~tabFromIndex) {
      throw Error(`Tab with name ${tabFromName} not found`)
    }
    const tabFrom = {...nextTabs[tabFromIndex]}
    if (tabFrom) {
      tabFrom.tracks = [...tabFrom.tracks]
      tabFrom.tracks.splice(posFrom, 1)
      nextTabs[tabFromIndex] = tabFrom
    }
  }

  const tabToIndex = getTabIndexByName(nextTabs, tabToName)
  const tabTo = {...nextTabs[tabToIndex]}
  tabTo.tracks = [...tabTo.tracks]
  nextTabs[tabToIndex] = tabTo
  if (posTo === null || posTo === undefined) {
    posTo = tabTo.tracks.length
  }
  let offset = (tabFromName === tabToName && posFrom < posTo) ? -1 : 0
  tabTo.tracks.splice(posTo + offset, 0, track)

  // move current track marker
  let currentIndex = statePos
  let offsetPos = 0
  if (stateCurrentTab === tabFromName && statePos >= posFrom) {
    offsetPos--
  }
  if (stateCurrentTab === tabToName && statePos >= posTo) {
    offsetPos++
  }
  let nextIndex = currentIndex + offsetPos
  if (stateCurrentTab === tabFromName && statePos === posFrom) {
    nextIndex = posTo + offsetPos
  }

  return {tabs: nextTabs, pos: nextIndex}
}

function removeTrack(stateTabs, currentTab, statePos, remTab, remPos) {
  console.log(`removeTrack: ${remTab}:${remPos}`)
  const tabIndex = getTabIndexByName(stateTabs, remTab)
  let nextTabs = [...stateTabs]
  let nextTab = {...nextTabs[tabIndex]}
  let nextTracks = [...nextTab.tracks]
  nextTab.tracks = nextTracks
  nextTabs[tabIndex] = nextTab
  const oldTrack = nextTracks[statePos]

  nextTracks.splice(remPos, 1)
  if (currentTab === remTab) {
    if (remPos < statePos) {
      return {tabs: nextTabs, pos: statePos - 1, track: nextTracks[statePos - 1]}
    } else if (remPos === statePos && nextTracks.length > 0) {
      let nextPos = nextTracks.length === statePos ? statePos - 1 : statePos
      return {tabs: nextTabs, pos: nextPos, track: nextTracks[nextPos]}
    }
  }
  return {tabs: nextTabs, pos: statePos, track: nextTracks[statePos] || oldTrack}
}

function sortBy(by, tabs, openTab, currentTab, pos) {
  let nextTabs = [...tabs]
  const tabIndex = getTabIndexByName(nextTabs, openTab)
  let newTab = {...nextTabs[tabIndex]}
  const nextTracks = [...newTab.tracks]
  newTab.tracks = nextTracks

  let currentTrack
  if (currentTab === openTab) {
    currentTrack = nextTracks[pos]
  }

  switch (by) {
    case types.BY_TITLE:
      nextTracks.sort((a, b) => a.title.localeCompare(b.title))
      break
    case types.BY_ARTIST:
      nextTracks.sort((a, b) => a.artist.localeCompare(b.artist))
      break
    case types.BY_DURATION:
      nextTracks.sort((a, b) => a.duration.localeCompare(b.duration))
      break
    case types.BY_PATH:
      nextTracks.sort((a, b) => (a.src).localeCompare(b.src))
      break
    case types.SHUFFLE:
      let j, temp
      for (let i = nextTracks.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        temp = nextTracks[j]
        nextTracks[j] = nextTracks[i]
        nextTracks[i] = temp
      }
      break
    case types.REVERSE:
      nextTracks.reverse()
      break
  }
  nextTabs[openTab] = newTab

  // change current pos
  let newPos
  if (currentTab === openTab) {
    for (let i = 0; i < nextTracks.length; i++) {
      if (currentTrack === nextTracks[i]) {
        newPos = i
      }
    }
    if (newPos === undefined) {
      console.warn(`Can't calculate new current pos number`)
    }
  }

  return {tabs: nextTabs, pos: newPos}
}

function getNextScrolledTabs(tabs, tabName, scrolledTabs) {
  let currentTabIndex = getTabIndexByName(tabs, tabName)
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

  tabs: [{
    name: types.DEFAULT_PL,
    tracks: []
  }],
  currentTab: types.DEFAULT_PL,
  openTab: types.DEFAULT_PL,
  scrolledTabs: 0,

  safePlaylists: [],
  serverPlaylists: [],
  isLocal: true,
  errors: {}
}

function returnNextTrackState(state, action) {
  const currentTabIndex = getTabIndexByName(state.tabs, state.currentTab)
  let nextUpdates = selectNextTrack(state.tabs[currentTabIndex], state.pos, action.type)
  // return {...state, track: nextUpdates.track, pos: nextUpdates.pos, isPlaying: nextUpdates.isPlaying}
  setTitle(nextUpdates.track)
  return {...state, ...nextUpdates}
}

const ACTION_HANDLERS = {
  // general
  [types.PLAYER_PLAY]: (state, action) => {
    setTitle(action.track)
    return {...state, isPlaying: state.pos !== -1}
  },
  [types.PLAYER_PAUSE]: (state, action) => {
    return {...state, isPlaying: false}
  },
  [types.SET_TRACK]: (state, action) => {
    setTitle(action.track)
    return {...state, track: action.track, currentTab: action.track.pl, isPlaying: true, pos: action.track.pos}
  },
  [types.PLAYER_NEXT]: returnNextTrackState,
  [types.PLAYER_PREV]: returnNextTrackState,
  [types.TRACK_ENDS]: returnNextTrackState,
  // options
  [types.SET_VOLUME]: (state, action) => {
    return {...state, volume: action.val, muted: false}
  },
  [types.TOGGLE_MUTE]: (state, action) => {
    return {...state, muted: !state.muted}
  },
  // management of lists
  [types.UPDATE_PLAYLIST]: (state, action) => {
    let index = state.tabs.findIndex(tab => tab.name === action.name)
    if (!~index) {
      index = state.tabs.length
    }
    const nextTabs = [...state.tabs]
    nextTabs[index] = {name: action.name, tracks: action.content}
    return {...state, tabs: nextTabs}
  },
  [types.CREATE_PLAYLIST]: (state, action) => {
    let createTabUpdates = addPlaylist(action.name, state.tabs)
    if (createTabUpdates.error) {
      return {...state, errors: {createPlaylist: createTabUpdates.error}}
    }
    return {
      ...state,
      tabs: createTabUpdates.tabs,
      openTab: createTabUpdates.openTab,
      errors: {}
    }
  },
  [types.CLOSE_OPEN_PLAYLIST]: (state, action) => {
    let closeTabUpdates = excludeOpenPlaylust(state.openTab, state.tabs)
    return {...state, tabs: closeTabUpdates.tabs, openTab: closeTabUpdates.openTab}
  },
  [types.CLOSE_OTHER_PLAYLISTS]: (state, action) => {
    return {
      ...state,
      tabs: [{name: state.openTab, tracks: state.tabs[state.openTab]}],
      openTab: state.openTab,
      scrolledTabs: 0
    }
  },
  // editing a playlist
  [types.MOVE_TRACK]: (state, action) => {
    let moveUpdates = moveTrack(state.tabs, state.currentTab, state.pos,
      action.track, action.tabFrom, action.posFrom, action.tabTo, action.posTo)
    return {...state, tabs: moveUpdates.tabs, pos: moveUpdates.pos}
  },
  [types.REMOVE_TRACK]: (state, action) => {
    let removeUpdates = removeTrack(state.tabs, state.currentTab, state.pos, action.tabName, action.pos)
    setTitle(removeUpdates.track)
    return {...state, tabs: removeUpdates.tabs, pos: removeUpdates.pos, track: removeUpdates.track}
  },
  [types.ADD_TO_PLAYLIST]: (state, action) => {
    let addToPlaylistUpdates = moveTrack(
      state.tabs, state.currentTab, state.pos, action.track,
      null, null, action.listTo, action.addNext ? state.pos + 1 : null
    )
    return {...state, tabs: addToPlaylistUpdates.tabs}
  },
  // sort
  [types.SORT_PLAYLIST]: (state, action) => {
    let sortUpdates = sortBy(action.by, state.tabs, state.openTab, state.currentTab, state.pos)
    return {...state, tabs: sortUpdates.tabs, pos: sortUpdates.pos}
  },
  // tabs
  [types.SELECT_TAB]: (state, action) => {
    return {
      ...state,
      openTab: action.tabName,
      scrolledTabs: getNextScrolledTabs(state.tabs, action.tabName, state.scrolledTabs)
    }
  },
  [types.SCROLL_LEFT]: (state, action) => {
    return {...state, scrolledTabs: state.scrolledTabs > 0 ? state.scrolledTabs - 1 : state.scrolledTabs}
  },
  [types.SCROLL_RIGHT]: (state, action) => {
    return {...state, scrolledTabs: state.scrolledTabs + 1}
  },
}

export default function playerReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  if (handler) {
    console.log(`action=${action.type}`)
    return handler(state, action)
  }

  const storageState = playerLocalStorageReducer(state, action)
  return storageState
}
