import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'fourth',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Fourth = require('./containers/FourthContainer').default
      const reducer = require('./modules/fourth').default

      injectReducer(store, { key: 'fourth', reducer })

      cb(null, Fourth)
    }, 'fourth')
  }
})
