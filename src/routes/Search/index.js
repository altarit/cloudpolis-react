export default (store) => ({
  path: '/music/search',
  name: 'search',
  getComponent() {
    return Promise.all([
      import('./containers/SearchContainer'),
      import('./modules/search'),
    ])
  }
})
