export const PLAYER_PLAY = 'PLAYER_PLAY';
export const PLAYER_PAUSE = 'PLAYER_PAUSE';
export const SET_TRACK = 'SET_TRACK';
export const SELECT_TAB = 'SELECT_TAB'
export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST'

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

export const actions = {
  play,
  pause,
  setTrack
};



const initialState = {
  isPlayed: false,
  track: {
    title: "",
    artist: "",
    src: "",
    duration: ""
  },
  plTab: DEFAULT_PL,
  plKeys: [DEFAULT_PL, '1234'],
  pls: {
    [DEFAULT_PL]: []
  }
}

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYER_PLAY:
      return {...state, isPlayed: true};
    case PLAYER_PAUSE:
      return {...state, isPlayed: false};
    case SET_TRACK:
      return {...state, track: action.payload};
    case SELECT_TAB:
      return {...state, plTab: action.payload};
    case UPDATE_PLAYLIST:
      return {...state, pls: {...state.pls, [action.name]: action.content}};
    default:
      return state;
  }
}
