import {injectReducer} from '../../store/reducers'

export default (store) => ({
  path: 'music/collections/create/*',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const CollectionsManager = require('./containers/CollectionsManagerContainer').default
      const reducer = require('./modules/collectionsManager').default

      injectReducer(store, {key: 'collections', reducer})

      cb(null, CollectionsManager)
    }, 'collections')
  }
})
