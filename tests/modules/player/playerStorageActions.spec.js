import * as playerStorage from 'modules/player/playerStorage'

const mockStore = configureStore(middlewares)

describe('modules/playerStorage - Actions', () => {
  describe('[local storage]', () => {
    beforeEach(() => {
      localStorage.clear()
      localStorage.itemInsertionCallback = null
    })

    it('loadPlaylistsFromStorage', () => {
      localStorage.setItem('safePlaylists', '{"Johann Strauss":[{"title":"Emperor Waltz"}]}')
      const store = mockStore()
      const expectedActions = [{
        type: playerStorage.STORAGE_LOAD_PLAYLISTS_SUCCESS,
        safePlaylists: {
          'Johann Strauss': [{title: 'Emperor Waltz'}]
        }
      }]

      store.dispatch(playerStorage.loadPlaylistsFromStorage())
      expect(store.getActions()).to.deep.equal(expectedActions)
    })

    it('savePlaylistToStorage', () => {
      localStorage.setItem('safePlaylists', '{"Johann Strauss":[{"title":"Emperor Waltz"}]}')
      const store = mockStore()
      const expectedActions = [{
        type: playerStorage.STORAGE_SAVE_PLAYLIST_SUCCESS,
        safePlaylists: {
          'G.Sviridov': [{
            title: 'Winter Road',
            library: undefined,
            artist: undefined,
            src: undefined,
            duration: undefined,
            compilation: undefined
          }],
          'Johann Strauss': [{
            title: 'Emperor Waltz'
          }]
        }
      }]

      store.dispatch(playerStorage.savePlaylistToStorage('G.Sviridov', [
        {title: 'Winter Road'}
      ]))
      expect(store.getActions()).to.deep.equal(expectedActions)
      expect(localStorage.getItem('safePlaylists')).to.equal(
        '{"Johann Strauss":[{"title":"Emperor Waltz"}],"G.Sviridov":[{"title":"Winter Road"}]}')
    })

    it('openPlaylistFromStorage', () => {
      localStorage.setItem('safePlaylists', '{"Sviridov": [{"title":"Winter Road"}]}')
      const store = mockStore()
      const expectedActions = [{
        type: playerStorage.STORAGE_OPEN_PLAYLIST_SUCCESS,
        filename: 'Sviridov',
        playlist: [{
          title: 'Winter Road'
        }]
      }]

      store.dispatch(playerStorage.openPlaylistFromStorage('Sviridov'))
      expect(store.getActions()).to.deep.equal(expectedActions)
      expect(localStorage.getItem('safePlaylists')).to.equal('{"Sviridov": [{"title":"Winter Road"}]}')
    })

    it('deletePlaylistFromStorage', () => {
      localStorage.setItem('safePlaylists',
        '{"Sviridov":[{"title":"Winter Road" }],"Johann Strauss":[{"title":"Emperor Waltz"}]}')
      const store = mockStore()
      const expectedActions = [{
        type: playerStorage.STORAGE_DELETE_PLAYLIST_SUCCESS,
        safePlaylists: {
          'Sviridov':[{
            title: 'Winter Road'
          }]
        }
      }]

      store.dispatch(playerStorage.deletePlaylistFromStorage('Johann Strauss'))
      expect(store.getActions()).to.deep.equal(expectedActions)
      expect(localStorage.getItem('safePlaylists')).to.equal('{"Sviridov":[{"title":"Winter Road"}]}')
    })
  })
})
