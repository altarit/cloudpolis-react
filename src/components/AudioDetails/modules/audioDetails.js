import {fetchGet, fetchPut} from '../../../modules/apiUtils'
import {cloneTrack} from "../../../modules/player/playerUtils"
import * as types from "../../../modules/player/storage/storageConstants"
import {lightEncode} from '../../../modules/formatUtils'

export const ENABLE_INFO_EDIT_MODE = 'ENABLE_INFO_EDIT_MODE'
export const ENABLE_LYRICS_EDIT_MODE = 'ENABLE_LYRICS_EDIT_MODE'
export const DISABLE_EDIT_MODE = 'DISABLE_EDIT_MODE'
export const SIDEBAR_WIDTH = 360
export const MOBILE_WIDTH = 576

export const AUDIO_DETAILS_GET_LYRICS_REQUEST = 'AUDIO_DETAILS_GET_LYRICS_REQUEST'
export const AUDIO_DETAILS_GET_LYRICS_SUCCESS = 'AUDIO_DETAILS_GET_LYRICS_SUCCESS'
export const AUDIO_DETAILS_GET_LYRICS_FAILURE = 'AUDIO_DETAILS_GET_LYRICS_FAILURE'

export const AUDIO_DETAILS_UPDATE_LYRICS_REQUEST = 'AUDIO_DETAILS_UPDATE_LYRICS_REQUEST'
export const AUDIO_DETAILS_UPDATE_LYRICS_SUCCESS = 'AUDIO_DETAILS_UPDATE_LYRICS_SUCCESS'
export const AUDIO_DETAILS_UPDATE_LYRICS_FAILURE = 'AUDIO_DETAILS_UPDATE_LYRICS_FAILURE'

export function enableInfoEditMode() {
  return {
    type: ENABLE_INFO_EDIT_MODE
  }
}

export function enableLyricsEditMode() {
  return {
    type: ENABLE_LYRICS_EDIT_MODE
  }
}

export function disableEditMode() {
  return {
    type: DISABLE_EDIT_MODE
  }
}

export function getTrackDetails(lib, compilation, track, trackId) {
  return (dispatch) => {
    dispatch({
      type: AUDIO_DETAILS_GET_LYRICS_REQUEST
    })

    let queryParams = {
      body: {lib, compilation, track}
    }
    return fetchGet(`/music/tracks/${trackId}?${lightEncode(lib + ';' + compilation + ';' + track)}`)
      .then(response => {
        console.log(`Sent stats`)
        dispatch({
          type: AUDIO_DETAILS_GET_LYRICS_SUCCESS,
          lyrics: response.data.lyrics
        })
      })
  }
}

export function updateLyrics(trackId, lyrics) {
  return (dispatch) => {
    dispatch({
      type: AUDIO_DETAILS_UPDATE_LYRICS_REQUEST,
      lyrics: lyrics
    })

    let params = {
      body: JSON.stringify({lyrics: lyrics})
    }

    return fetchPut(`/music/tracks/${trackId}`, params)
      .then(response => {
        dispatch({
          type: AUDIO_DETAILS_UPDATE_LYRICS_SUCCESS
        })
      })
  }
}

const initialState = {
  isInfoEditMode: false,
  isLirycsEditMode: false,
}

export default function audioDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case ENABLE_INFO_EDIT_MODE:
      return {...state, isInfoEditMode: true, isLirycsEditMode: false}
    case ENABLE_LYRICS_EDIT_MODE:
      return {...state, isInfoEditMode: false, isLirycsEditMode: true}
    case DISABLE_EDIT_MODE:
      return {...state, isInfoEditMode: false, isLirycsEditMode: false}
    case AUDIO_DETAILS_GET_LYRICS_REQUEST:
      return {...state, isInfoEditMode: false, isLirycsEditMode: false, lyrics: ''}
    case AUDIO_DETAILS_GET_LYRICS_SUCCESS:
      return {...state, isInfoEditMode: false, isLirycsEditMode: false, lyrics: action.lyrics}
    case AUDIO_DETAILS_UPDATE_LYRICS_REQUEST:
      return {...state, isInfoEditMode: false, isLirycsEditMode: false, lyrics: action.lyrics}
    case AUDIO_DETAILS_UPDATE_LYRICS_SUCCESS:
      return {...state, isInfoEditMode: false, isLirycsEditMode: false}
  }
  return state
}
