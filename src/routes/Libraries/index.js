import {injectReducer} from '../../store/reducers'

export default (store) => ({
  path: 'music/libraries',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Libraries = require('./containers/LibrariesContainer').default
      const reducer = require('./modules/libraries').default
      const additionalReducer = require('./modules/librariesManager').default

      injectReducer(store, {key: 'libraries', reducer})
      injectReducer(store, {key: 'librariesManager', additionalReducer})

      cb(null, Libraries)
    }, 'libraries')
  }
})
