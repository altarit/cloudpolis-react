export default (store) => ({
  path: '/music/libraries/:libraryName',
  name: 'library',
  getComponent() {
    return Promise.all([
      import('./containers/LibraryContainer'),
      import('./modules/library'),
    ])
  }
})
