export const ADD_LETTER = 'ADD_LETTER'
export const SET_MESSAGE = 'SET_MESSAGE'

export function addLetter (letter = 'A') {
  return {
    type: ADD_LETTER,
    payload: letter
  }
}

export function setMessage (message = 'Q') {
  return {
    type: SET_MESSAGE,
    payload: message
  }
}

export const actions = {
  addLetter,
  setMessage
}

const initialState = ''
export default function fourthReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_LETTER:
      return state + action.payload
    case SET_MESSAGE:
      return action.payload
    default:
      return state
  }
}
