export default (store) => ({
  path: '/admin',
  name: 'admin',
  getComponent() {
    return Promise.all([
      import('./containers/AdminContainer'),
      import('./modules/admin'),
    ])
  }
})
