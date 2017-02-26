import {injectReducer} from '../../store/reducers'

export default (store) => ({
  path: 'admin/access',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const AccessLog = require('./containers/AccessLogContainer').default
      const reducer = require('./modules/accessLog').default

      injectReducer(store, {key: 'accessLog', reducer})

      cb(null, AccessLog)
    }, 'accessLog')
  }
})
