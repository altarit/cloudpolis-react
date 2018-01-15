export default {
  path: '/music/artists',
  name: 'artists',
  getComponent() {
    return Promise.all([
      import('./containers/ArtistsContainer'),
      import('./modules/artists'),
    ])
  }
}
