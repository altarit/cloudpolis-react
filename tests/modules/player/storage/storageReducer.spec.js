import * as types from 'modules/player/storage/storageConstants'
import reducer from 'modules/player/storage/storageReducer'

describe('modules/playerStorage - Reducer', () => {
  describe('[local storage]', () => {
    it('STORAGE_LOAD_PLAYLISTS_SUCCESS', () => {
      const nextState = reducer({}, {
        type: types.STORAGE_LOAD_PLAYLISTS_SUCCESS,
        safePlaylists: {
          'Johann Strauss': [{
            title: 'Emperor Waltz'
          }]
        }
      })

      expect(nextState).to.deep.equal({
        safePlaylists: {
          'Johann Strauss': [{
            title: 'Emperor Waltz'
          }]
        }
      })
    })

    it('STORAGE_SAVE_PLAYLIST_SUCCESS', () => {
      const nextState = reducer({}, {
        type: types.STORAGE_SAVE_PLAYLIST_SUCCESS,
        safePlaylists: {
          'Johann Strauss': [{
            title: 'Emperor Waltz'
          }]
        }
      })

      expect(nextState).to.deep.equal({
        safePlaylists: {
          'Johann Strauss': [{
            title: 'Emperor Waltz'
          }]
        }
      })
    })

    it('STORAGE_OPEN_PLAYLIST_SUCCESS', () => {
      const nextState = reducer({
        tabs: []
      }, {
        type: types.STORAGE_OPEN_PLAYLIST_SUCCESS,
        filename: 'Johann Strauss',
        playlist: [{
          name: 'Johann Strauss',
          tracks: [{
            title: 'Emperor Waltz'
          }]
        }]
      })

      expect(nextState).to.deep.equal({
        tabs: [{
          name: 'Johann Strauss',
          tracks: [{
            title: 'Emperor Waltz'
          }]
        }],
        openTab: 'Johann Strauss'
      })
    })

    it('STORAGE_DELETE_PLAYLIST_SUCCESS', () => {
      const nextState = reducer({
        safePlaylists: {
          'Johann Strauss': [{
            title: 'Emperor Waltz'
          }]
        }
      }, {
        type: types.STORAGE_DELETE_PLAYLIST_SUCCESS,
        safePlaylists: {}
      })

      expect(nextState).to.deep.equal({
        safePlaylists: {}
      })
    })
  })
})
