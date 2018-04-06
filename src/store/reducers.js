import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux'

import sidebarReducer from '../components/SideBar/modules/sideBar'
import audioDetailsReducer from '../components/AudioDetails/modules/audioDetails'
import playerReducer from '../modules/player/playerReducer'
import popupReducer from '../modules/popups'
import homeReducer from '../routes/Home/modules/home'
import authReducer from '../components/Auth/modules/authReducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    routing: routerReducer,
    form: formReducer,
    sidebar: sidebarReducer,
    audioDetails: audioDetailsReducer,
    player: playerReducer,
    popups: popupReducer,
    home: homeReducer,
    auth: authReducer,
    ...asyncReducers,
  })
}

export const injectReducer = (store, {key, reducer}) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
