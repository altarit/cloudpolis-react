export default {
  path: '/music/libraries/:artistsLibrary/:artistName',
  name: 'artist',
  getComponent() {
    return Promise.all([
      import('./containers/ArtistContainer'),
      import('./modules/artist'),
    ])
  }
}
