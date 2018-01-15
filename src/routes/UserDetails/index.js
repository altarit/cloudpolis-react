export default (store) => ({
  path: '/users/:username',
  name: 'userDetails',
  getComponent() {
    return Promise.all([
      import('./containers/UserDetailsContainer'),
      import('./modules/userDetails'),
    ])
  }
})
