import * as types from 'modules/player/playerConstants'
import * as actions from 'modules/player/playerActions'

describe('modules/player - Actions', () => {
  describe('[general]', () => {
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
        track: {
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

    it('endTrack', () => {
      expect(actions.endTrack()).to.deep.equal({
        type: types.TRACK_ENDS
      })
    })
  })

  describe('[options]', () => {
    it('setVolume', () => {
      expect(actions.setVolume(0.42)).to.deep.equal({
        type: types.SET_VOLUME,
        val: 0.42
      })
    })

    it('toggleMute', () => {
      expect(actions.toggleMute()).to.deep.equal({
        type: types.TOGGLE_MUTE
      })
    })
  })

  describe('[management of playlists]', () => {
    it('updatePlaylist')

    it('createPlaylist', () => {
      expect(actions.createPlaylist('Vivaldi')).to.deep.equal({
        type: types.CREATE_PLAYLIST,
        name: 'Vivaldi'
      })
    })

    it('closeOpenPlaylist', () => {
      expect(actions.closeOpenPlaylist()).to.deep.equal({
        type: types.CLOSE_OPEN_PLAYLIST
      })
    })

    it('closeOtherPlaylists', () => {
      expect(actions.closeOtherPlaylists()).to.deep.equal({
        type: types.CLOSE_OTHER_PLAYLISTS
      })
    })
  })

  describe('[playlist editing]', () => {
    it('removeTrack', () => {
      expect(actions.removeTrack('Favorites', 3)).to.deep.equal({
        type: types.REMOVE_TRACK,
        plName: 'Favorites',
        pos: 3
      })
    })

    it('moveTrack', () => {
      expect(actions.moveTrack({title: 'Canon'}, 'Default', 4, 'Favorites', 7)).to.deep.equal({
        type: types.MOVE_TRACK,
        track: {title: 'Canon'},
        plFrom: 'Default',
        posFrom: 4,
        plTo: 'Favorites',
        posTo: 7
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

  describe('[tabs]', () => {
    it('selectTab', () => {
      expect(actions.selectTab('Music')).to.deep.equal({
        type: types.SELECT_TAB,
        tabName: 'Music'
      })
    })

    it('scrollLeft', () => {
      expect(actions.scrollLeft()).to.deep.equal({
        type: types.SCROLL_LEFT
      })
    })

    it('scrollRight', () => {
      expect(actions.scrollRight()).to.deep.equal({
        type: types.SCROLL_RIGHT
      })
    })
  })
})
