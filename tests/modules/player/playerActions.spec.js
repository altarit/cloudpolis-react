import * as types from 'modules/player/playerConstants'
import * as actions from 'modules/player/playerActions'

describe('modules/player - Actions', () => {
  describe('[controls]', () => {
    it('play', () => {
      expect(actions.play()).to.deep.equal({
        type: types.PLAYER_PLAY
      })
    })

    it('pause', () => {
      expect(actions.pause()).to.deep.equal({
        type: types.PLAYER_PAUSE
      })
    })

    it('setTrack', () => {
      expect(actions.setTrack({
        src: '/Pachelbel/Canon.mp3',
        artist: 'Pachelbel',
        title: 'Canon'
      })).to.deep.equal({
        type: types.SET_TRACK,
        payload: {
          src: '/Pachelbel/Canon.mp3',
          artist: 'Pachelbel',
          title: 'Canon'
        }
      })
    })

    it('nextTrack', () => {
      expect(actions.nextTrack()).to.deep.equal({
        type: types.PLAYER_NEXT
      })
    })

    it('prevTrack', () => {
      expect(actions.prevTrack()).to.deep.equal({
        type: types.PLAYER_PREV
      })
    })
  })

  describe('[local storage]', () => {
    it('loadPlaylistsFromStorage', () => {
      expect(actions.loadPlaylistsFromStorage()).to.deep.equal({
        type: types.STORAGE_LOAD_PLAYLISTS
      })
    })

    it('savePlaylistsToStorage')

    it('openPlaylistFromStorage', () => {
      expect(actions.openPlaylistFromStorage('Sviridov')).to.deep.equal({
        type: types.STORAGE_OPEN_PLAYLIST,
        filename: 'Sviridov'
      })
    })

    it('deletePlaylistFromStorage', () => {
      expect(actions.deletePlaylistFromStorage('Bizet')).to.deep.equal({
        type: types.STORAGE_DELETE_PLAYLIST,
        filename: 'Bizet'
      })
    })
  })

  describe('[sort]', () => {
    it('sortByTitle', () => {
      expect(actions.sortByTitle()).to.deep.equal({
        type: types.SORT_PLAYLIST,
        by: types.BY_TITLE
      })
    })

    it('sortByArtist', () => {
      expect(actions.sortByArtist()).to.deep.equal({
        type: types.SORT_PLAYLIST,
        by: types.BY_ARTIST
      })
    })

    it('sortByDuration', () => {
      expect(actions.sortByDuration()).to.deep.equal({
        type: types.SORT_PLAYLIST,
        by: types.BY_DURATION
      })
    })

    it('sortByPath', () => {
      expect(actions.sortByPath()).to.deep.equal({
        type: types.SORT_PLAYLIST,
        by: types.BY_PATH
      })
    })

    it('shuffle', () => {
      expect(actions.shuffle()).to.deep.equal({
        type: types.SORT_PLAYLIST,
        by: types.SHUFFLE
      })
    })

    it('reverse', () => {
      expect(actions.reverse()).to.deep.equal({
        type: types.SORT_PLAYLIST,
        by: types.REVERSE
      })
    })
  })
})
