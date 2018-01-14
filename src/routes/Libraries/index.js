import {injectReducer} from '../../store/reducers'

export default (store) => ({
  path: '/music/libraries',
  name: 'libraries',
  getComponent() {
    return Promise.all([
      import('./containers/LibrariesContainer'),
      import('./modules/libraries'),
      import('./modules/librariesManager'),
    ])
      .then(modules => {
        injectReducer(store, {key: 'libraries', reducer: modules[1]}).default
        injectReducer(store, {key: 'librariesManager', reducer: modules[2].default})
        return [modules[0]]
      })
  }
})
