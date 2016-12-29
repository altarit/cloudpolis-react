export const PLAYER_PLAY = 'PLAYER_PLAY';
export const PLAYER_PAUSE = 'PLAYER_PAUSE';
export const SET_TRACK = 'SET_TRACK';
export const SELECT_TAB = 'SELECT_TAB'
export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST'
export const SET_CURRENT_PL = 'SET_CURRENT_PL'
export const PLAYER_NEXT = 'PLAYER_NEXT'
export const PLAYER_PREV = 'PLAYER_PREV'
export const PLAYER_END = 'PLAYER_END'

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
  plKeys: [DEFAULT_PL, '1234', 'Depeche Mode', '4everfreebrony', 'Wasteland Walliers'],
  pls: {
    [DEFAULT_PL]: []
  }
}

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYER_PLAY:
      return {...state, isPlayed: !!state.track.title};
    case PLAYER_PAUSE:
      return {...state, isPlayed: false};
    case SET_TRACK:
      return {...state, track: action.payload, isPlayed: true};
    case SELECT_TAB:
      return {...state, plTab: action.payload};
    case UPDATE_PLAYLIST:
      return {...state, pls: {...state.pls, [action.name]: action.content}};
    case SET_CURRENT_PL:
      return {...state, currentPl: action.name}
    case PLAYER_NEXT:
      return {...state, ...selectNextTrack(state, action.type)}
    case PLAYER_PREV:
      return {...state, ...selectNextTrack(state, action.type)}
    case PLAYER_END:
      return {...state, ...selectNextTrack(state, action.type)}
    default:
      return state;
  }
}
