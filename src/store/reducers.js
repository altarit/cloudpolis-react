import { combineReducers } from 'redux';
import locationReducer from './location';

import sidebarReducer from '../components/Sidebar/modules/sidebar';
import playerReducer from '../modules/player';
import popupReducer from '../modules/popups'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    ...asyncReducers,
    sidebar: sidebarReducer,
    player: playerReducer,
    popups: popupReducer
  })
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
