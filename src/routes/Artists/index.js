import {injectReducer} from '../../store/reducers';

export default (store) => ({
  path: 'music/artists',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Artists = require('./containers/ArtistsContainer').default;
      const reducer = require('./modules/artists').default;

      injectReducer(store, { key: 'artists', reducer });

      cb(null, Artists);
    }, 'artists');
  }
});
