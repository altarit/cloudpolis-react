import {injectReducer} from '../../store/reducers'

export default (store) => ({
  path: 'music/artists/:artistsLibrary/:artistName',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Artist = require('./containers/ArtistContainer').default
      const reducer = require('./modules/artist').default

      injectReducer(store, {key: 'artist', reducer})

      cb(null, Artist)
    }, 'artist')
  }
})
