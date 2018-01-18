import * as types from './playerConstants'
import {cloneTrack, setTitle} from './playerUtils'
import playerLocalStorageReducer from './storage/storageReducer'

export function getPlIndexByName(pls, plName) {
  const result = pls.findIndex(pl => pl.name === plName)
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

function selectNextTrack(pl, pos, type) {
  if (!pl) return {}

  let currentIndex = pos
  if (currentIndex < 0) return {isPlaying: type !== types.TRACK_ENDS}

  let nextIndex = getNextIndexByType(currentIndex, type)
  let track = pl.tracks[nextIndex]
  if (!track) return {isPlaying: type !== types.TRACK_ENDS}

  return {
    track: track,
    isPlaying: true,
    pos: nextIndex
  }
}

function addPlaylist(name, pls) {
  if (!name) {
    return {error: 'Type something'}
  }
  if (name.length > 32) {
    return {error: 'Too long'}
  }
  const index = getPlIndexByName(pls, name)
  if (~index) {
    return {error: `Playlist ${name} already exists`}
  }
  if (pls.length >= 20) {
    return {error: `Too many playlists`}
  }

  return {
    pls: [...pls, {name: name, content: []}],
    openTab: name
  }
}

function excludeOpenPlaylust(openTab, pls) {
  let index = getPlIndexByName(pls, openTab)
  if (!~index) return

  let nextPls = [...pls]
  nextPls.splice(index, 1)
  if (!nextPls.length) {
    nextPls.push({name: types.DEFAULT_PL, tracks: []})
  }
  let nextOpenTab = index < nextPls.length ? nextPls[index] : nextPls[index - 1]
  return {
    pls: nextPls,
    openTab: nextOpenTab
  }
}

function moveTrack(statePls, stateCurrentPl, statePos, oldTrack, plFromName, posFrom, plToName, posTo) {
  console.log(`moveTrack: ${plFromName}:${posFrom} -> ${plToName}:${posTo}`)
  let track = cloneTrack(oldTrack)
  console.log(`${track.title}`)
  const nextPls = [...statePls]
  if (plFromName) {
    const plFromIndex = getPlIndexByName(nextPls, plFromName)
    if (!~plFromIndex) {
      throw Error(`Tab with name ${plFromName} not found`)
    }
    const plFrom = {...nextPls[plFromIndex]}
    if (plFrom) {
      plFrom.tracks = [...plFrom.tracks]
      plFrom.tracks.splice(posFrom, 1)
      nextPls[plFromIndex] = plFrom
    }
  }
  // let track = plFrom.splice(posFrom, 1)
  const plToIndex = getPlIndexByName(nextPls, plToName)
  const plTo = {...nextPls[plToIndex]}
  plTo.tracks = [...plTo.tracks]
  nextPls[plToIndex] = plTo
  if (posTo === null || posTo === undefined) {
    posTo = plTo.tracks.length
  }
  let offset = (plFromName === plToName && posFrom < posTo) ? -1 : 0
  plTo.tracks.splice(posTo + offset, 0, track)

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
  const plIndex = getPlIndexByName(statePls, remPl)
  let nextPls = [...statePls]
  let nextPl = {...nextPls[plIndex]}
  let nextTracks = [...nextPl.tracks]
  nextPl.tracks = nextTracks
  nextPls[plIndex] = nextPl

  nextTracks.splice(remPos, 1)
  if (currentPl === remPl) {
    if (remPos < statePos) {
      return {pls: nextPls, pos: statePos - 1, track: nextTracks[statePos - 1]}
    } else if (remPos === statePos && nextTracks.length > 0) {
      let nextPos = nextTracks.length === statePos ? statePos - 1 : statePos
      return {pls: nextPls, pos: nextPos, track: nextTracks[nextPos]}
    }
  }
  return {pls: nextPls, pos: statePos, track: nextPls[plIndex].tracks[statePos]}
}

function sortBy(by, pls, openTab, currentPl, pos) {
  let newPls = [...pls]
  const plIndex = getPlIndexByName(newPls, openTab)
  let newPl = {...newPls[plIndex]}
  const nextTracks = [...newPl.tracks]
  newPl.tracks = nextTracks

  let currentTrack
  if (currentPl === openTab) {
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
  newPls[openTab] = newPl

  // change current pos
  let newPos
  if (currentPl === openTab) {
    for (let i = 0; i < nextTracks.length; i++) {
      if (currentTrack === nextTracks[i]) {
        newPos = i
      }
    }
    if (newPos === undefined) {
      console.warn(`Can't calculate new current pos number`)
    }
  }

  return {pls: newPls, pos: newPos}
}

function getNextScrolledTabs(pls, tabName, scrolledTabs) {
  let currentTabIndex = getPlIndexByName(pls, tabName)
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

  pls: [{
    name: types.DEFAULT_PL,
    tracks: []
  }],
  currentPl: types.DEFAULT_PL,
  openTab: types.DEFAULT_PL,
  scrolledTabs: 0,

  safePlaylists: {},
  serverPlaylists: [],
  isLocal: true,
  errors: {}
}

function returnNextTrackState(state, action) {
  const currentPlIndex = getPlIndexByName(state.pls, state.currentPl)
  let nextUpdates = selectNextTrack(state.pls[currentPlIndex], state.pos, action.type)
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
    return {...state, track: action.track, currentPl: action.track.pl, isPlaying: true, pos: action.track.pos}
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
    let index = state.pls.findIndex(pl => pl.name === action.name)
    if (!~index) {
      index = state.pls.length
    }
    const plsCopy = [...state.pls]
    plsCopy[index] = {name: action.name, tracks: action.content}
    return {...state, pls: plsCopy}
  },
  [types.CREATE_PLAYLIST]: (state, action) => {
    let createPlUpdates = addPlaylist(action.name, state.pls)
    if (createPlUpdates.error) {
      return {...state, errors: {createPlaylist: createPlUpdates.error}}
    }
    return {
      ...state,
      pls: createPlUpdates.pls,
      openTab: createPlUpdates.openTab,
      errors: {}
    }
  },
  [types.CLOSE_OPEN_PLAYLIST]: (state, action) => {
    let closePlUpdates = excludeOpenPlaylust(state.openTab, state.pls)
    return {...state, pls: closePlUpdates.pls, openTab: closePlUpdates.openTab}
  },
  [types.CLOSE_OTHER_PLAYLISTS]: (state, action) => {
    return {
      ...state,
      pls: [{name: state.openTab, tracks: state.pls[state.openTab]}],
      openTab: state.openTab,
      scrolledTabs: 0
    }
  },
  // editing a playlist
  [types.MOVE_TRACK]: (state, action) => {
    let moveUpdates = moveTrack(state.pls, state.currentPl, state.pos,
      action.track, action.plFrom, action.posFrom, action.plTo, action.posTo)
    return {...state, pls: moveUpdates.pls, pos: moveUpdates.pos}
  },
  [types.REMOVE_TRACK]: (state, action) => {
    let removeUpdates = removeTrack(state.pls, state.currentPl, state.pos, action.plName, action.pos)
    setTitle(removeUpdates.track)
    return {...state, pls: removeUpdates.pls, pos: removeUpdates.pos, track: removeUpdates.track}
  },
  [types.ADD_TO_PLAYLIST]: (state, action) => {
    let addToPlaylistUpdates = moveTrack(
      state.pls, state.currentPl, state.pos, action.track,
      null, null, action.listTo, action.addNext ? state.pos + 1 : null
    )
    return {...state, pls: addToPlaylistUpdates.pls}
  },
  // sort
  [types.SORT_PLAYLIST]: (state, action) => {
    let sortUpdates = sortBy(action.by, state.pls, state.openTab, state.currentPl, state.pos)
    return {...state, pls: sortUpdates.pls, pos: sortUpdates.pos}
  },
  // tabs
  [types.SELECT_TAB]: (state, action) => {
    return {
      ...state,
      openTab: action.tabName,
      scrolledTabs: getNextScrolledTabs(state.pls, action.tabName, state.scrolledTabs)
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
