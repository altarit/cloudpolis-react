import * as types from './playerConstants'
import {openConfirmation, openSingleInput, closeAllPopups} from '../popups'
import {getTabIndexByName} from "./playerReducer"

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

export function toogleRepeat() {
  return {
    type: types.TOGGLE_REPEAT
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

function validatePlaylist(tabs, name) {
  if (!name) {
    return {error: 'Type something'}
  }
  if (name.length > 32) {
    return {error: 'Too long'}
  }
  const index = getTabIndexByName(tabs, name)
  if (~index) {
    return {error: `Playlist already exists`}
  }
  if (tabs.length >= 20) {
    return {error: `Too many playlists`}
  }
}

export function createPlaylist(defaultValue, errorText) {
  const createLibraryAction = result => (dispatch, getState) => {
    const tabs = getState().player.tabs
    const error = validatePlaylist(tabs, result)
    if (error) {
      dispatch(createPlaylist(result, error.error))
    } else {
      dispatch({
        type: types.CREATE_PLAYLIST,
        name: result
      })
      dispatch(closeAllPopups())
    }
  }

  return openSingleInput(`Playlist name:`, 'Create', defaultValue, errorText, createLibraryAction)
}

export function renamePlaylist(name, defaultValue, errorText) {
  const renamePlaylistAction = result => (dispatch, getState) => {
    const tabs = getState().player.tabs
    const error = validatePlaylist(tabs, result)
    if (error) {
      dispatch(createPlaylist(result, error.error))
    } else {
      dispatch({
        type: types.RENAME_PLAYLIST,
        oldName: name,
        newName: result
      })
      dispatch(closeAllPopups())
    }
  }

  return openSingleInput(`Renaming ${name}:`, 'Rename', defaultValue, errorText, renamePlaylistAction)
}

export function closePlaylist(name) {
  const closeAction = {
    type: types.CLOSE_OPEN_PLAYLIST
  }

  return openConfirmation(`Close ${name}?`, 'Yep', 'No, wait', closeAction)
}

export function closeOthersPlaylists(name) {
  const closeAction = {
    type: types.CLOSE_OTHER_PLAYLISTS
  }
  return openConfirmation(`Close all except ${name}?`, 'All of them!', 'Cancel', closeAction)
}

// --------------------------------
// Playlist changes
// --------------------------------

export function moveTrack(track, tabFrom, posFrom, tabTo, posTo) {
  return {
    type: types.MOVE_TRACK,
    track,
    tabFrom,
    posFrom,
    tabTo,
    posTo
  }
}

export function removeTrack(tabName, pos) {
  return {
    type: types.REMOVE_TRACK,
    tabName,
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

export function selectTab(tabName) {
  return {
    type: types.SELECT_TAB,
    tabName
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
// Drag and Drop
// --------------------------------

export function trackDragStart(item, mutable) {
  return {
    type: types.TRACK_DRAG_START,
    item: item,
    mutable: mutable
  }
}

export function trackDragEnd() {
  return {
    type: types.TRACK_DRAG_END,
  }
}

export function dropTrack(pl, pos) {
  return {
    type: types.TRACK_DRAG_DROP,
    tabTo: pl,
    posTo: pos
  }
}


export function dropDeleteTrack() {
  return {
    type: types.TRACK_DRAG_DROP_DELETE
  }
}

// --------------------------------
//
// --------------------------------
