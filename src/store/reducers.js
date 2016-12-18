import { combineReducers } from 'redux';
import locationReducer from './location';

import sideBarReducer from '../components/SideBar/modules/sideBar';
import barsReducer from '../modules/barsReducer';
import playerReducer from '../components/BottomBar/modules/bottomBar';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    ...asyncReducers,
    sideBar: sideBarReducer,
    bars: barsReducer,
    player: playerReducer
  })
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
