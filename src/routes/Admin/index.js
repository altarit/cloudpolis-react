import {injectReducer} from '../../store/reducers'

export default (store) => ({
  path: 'admin',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Admin = require('./containers/AdminContainer').default
      const reducer = require('./modules/admin').default

      injectReducer(store, {key: 'admin', reducer})

      cb(null, Admin)
    }, 'admin')
  }
})
