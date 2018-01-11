import {injectReducer} from '../../store/reducers'

export default (store) => ({
  path: 'music/playlists',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Playlists = require('./containers/PlaylistsContainer').default
      const reducer = require('./modules/playlists').default

      injectReducer(store, {key: 'playlists', reducer})

      cb(null, Playlists)
    }, 'playlists')
  }
})
