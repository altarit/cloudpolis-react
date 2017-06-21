import {injectReducer} from '../../store/reducers'

export default (store) => ({
  path: 'music/collections',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Collections = require('./containers/CollectionContainer').default
      const reducer = require('./modules/collections').default

      injectReducer(store, {key: 'collections', reducer})

      cb(null, Collections)
    }, 'collections')
  }
})
