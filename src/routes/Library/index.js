import {injectReducer} from '../../store/reducers'

export default (store) => ({
  path: 'music/libraries/:libraryName',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Library = require('./containers/LibraryContainer').default
      const reducer = require('./modules/library').default

      injectReducer(store, {key: 'library', reducer})

      cb(null, Library)
    }, 'library')
  }
})
