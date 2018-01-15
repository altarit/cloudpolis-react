export default (store) => ({
  path: '/music/playlists',
  name: 'playlists',
  getComponent() {
    return Promise.all([
      import('./containers/PlaylistsContainer'),
      import('./modules/playlists'),
    ])
  }
})
