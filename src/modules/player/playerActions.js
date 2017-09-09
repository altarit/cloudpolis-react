import * as types from './playerConstants'
import {cloneTrack} from './playerUtils'

// --------------------------------
// General
// --------------------------------

export function play() {
  return {
    type: types.PLAYER_PLAY
  }
}

export function pause() {
  return {
    type: types.PLAYER_PAUSE
  }
}

export function setTrack(track) {
  return {
    type: types.SET_TRACK,
    track: track
  }
}

export function nextTrack() {
  return {
    type: types.PLAYER_NEXT
  }
}

export function prevTrack() {
  return {
    type: types.PLAYER_PREV
  }
}

export function endTrack() {
  return {
    type: types.TRACK_ENDS
  }
}

// --------------------------------
// Options
// --------------------------------

export function setVolume(val) {
  return {
    type: types.SET_VOLUME,
    val
  }
}

export function toggleMute() {
  return {
    type: types.TOGGLE_MUTE
  }
}

// --------------------------------
// Management of lists
// --------------------------------

export function updatePlaylist(name, content) {
  return {
    type: types.UPDATE_PLAYLIST,
    name: name || types.DEFAULT_PL,
    content: [...content]
  }
}

export function createPlaylist(name) {
  return {
    type: types.CREATE_PLAYLIST,
    name
  }
}

export function closeOpenPlaylist() {
  return {
    type: types.CLOSE_OPEN_PLAYLIST
  }
}

export function closeOtherPlaylists() {
  return {
    type: types.CLOSE_OTHER_PLAYLISTS
  }
}

// --------------------------------
// Playlist changes
// --------------------------------

export function moveTrack(track, plFrom, posFrom, plTo, posTo) {
  return {
    type: types.MOVE_TRACK,
    track,
    plFrom,
    posFrom,
    plTo,
    posTo
  }
}

export function removeTrack(plName, pos) {
  return {
    type: types.REMOVE_TRACK,
    plName,
    pos
  }
}

export function addToPlaylist(track, listTo, addNext) {
  return {
    type: types.ADD_TO_PLAYLIST,
    track,
    listTo,
    addNext
  }
}

// --------------------------------
// Sort
// --------------------------------

export function sortByTitle() {
  return {
    type: types.SORT_PLAYLIST,
    by: types.BY_TITLE
  }
}
export function sortByArtist() {
  return {
    type: types.SORT_PLAYLIST,
    by: types.BY_ARTIST
  }
}
export function sortByDuration() {
  return {
    type: types.SORT_PLAYLIST,
    by: types.BY_DURATION
  }
}
export function sortByPath() {
  return {
    type: types.SORT_PLAYLIST,
    by: types.BY_PATH
  }
}
export function shuffle() {
  return {
    type: types.SORT_PLAYLIST,
    by: types.SHUFFLE
  }
}
export function reverse() {
  return {
    type: types.SORT_PLAYLIST,
    by: types.REVERSE
  }
}

// --------------------------------
// Tabs
// --------------------------------

export function selectTab(playlistName) {
  return {
    type: types.SELECT_TAB,
    tabName: playlistName
  }
}

export function scrollLeft() {
  return {
    type: types.SCROLL_LEFT
  }
}

export function scrollRight() {
  return {
    type: types.SCROLL_RIGHT
  }
}

// --------------------------------
//
// --------------------------------
