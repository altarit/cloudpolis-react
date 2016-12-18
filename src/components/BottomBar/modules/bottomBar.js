export const PLAYER_PLAY = 'PLAYER_PLAY';
export const PLAYER_PAUSE = 'PLAYER_PAUSE';

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

export const actions = {
  play,
  pause
};


const initialState = '';
export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYER_PLAY:
      return true;
    case PLAYER_PAUSE:
      return false;
    default:
      return state;
  }
}
