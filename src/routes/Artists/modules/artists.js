export const GET_ARTISTS_REQUEST = 'GET_ARTISTS_REQUEST';
export const GET_ARTISTS_SUCCESS = 'GET_ARTISTS_SUCCESS';
export const GET_ARTISTS_FAILED = 'GET_ARTISTS_FAILED';

export function getArtists() {
  return (dispatch) => {
    dispatch({
      type: GET_ARTISTS_REQUEST
    })

    fetch('http://localhost/api/music/artists/').then(res => {
      return res.json()
    }).then(artists => {
      dispatch({
        type: GET_ARTISTS_SUCCESS,
        payload: artists.data
      })
    })
  }
}


const initialState = {
  fetching: false,
  artists: []
};

export default function artistsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTISTS_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case GET_ARTISTS_SUCCESS:
      return {
        fetching: false,
        artists: action.payload
      }
  }

  return state;
}
