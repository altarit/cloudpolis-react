export const PLAYER_PLAY = 'PLAYER_PLAY';
export const PLAYER_PAUSE = 'PLAYER_PAUSE';
export const SET_TRACK = 'SET_TRACK';

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

export const actions = {
  play,
  pause,
  setTrack
};


const initialState = {
  isPlayed: false,
  track: {
    title: "Open Your Eyes",
    artist: "Aviators",
    src: "song1.mp3",
    duration: 180
  }
};
export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYER_PLAY:
      return {...state, isPlayed: true};
    case PLAYER_PAUSE:
      return {...state, isPlayed: false};
    case SET_TRACK:
      return {...state, track: action.payload};
    default:
      return state;
  }
}
