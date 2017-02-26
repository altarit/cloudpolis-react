import {injectReducer} from '../../store/reducers'

export default (store) => ({
  path: 'users/:username',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const UserDetails = require('./containers/UserDetailsContainer').default
      const reducer = require('./modules/userDetails').default

      injectReducer(store, {key: 'userDetails', reducer})

      cb(null, UserDetails)
    }, 'userDetails')
  }
})
