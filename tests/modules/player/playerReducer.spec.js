import * as types from 'modules/player/playerConstants'
import reducer from 'modules/player/playerReducer'

describe('modules/player - Reducer', () => {
  describe('[general]', () => {
    it('Should have initial state', () => {
      const nextState = reducer(undefined, {})
      expect(nextState.pos).to.equal(-1)
      expect(nextState.isPlaying).to.be.false
      expect(nextState.track).to.deep.equal({
        title: '',
        artist: '',
        src: '',
        duration: ''
      })
    })

    it('PLAYER_PLAY', () => {
      const nextState = reducer({
        isPlaying: false,
        pos: 3
      }, {
        type: types.PLAYER_PLAY
      })

      expect(nextState).to.deep.equal({
        isPlaying: true,
        pos: 3
      })
    })

    it('PLAYER_PAUSE', () => {
      const nextState = reducer({
        isPlaying: true,
        pos: 4
      }, {
        type: types.PLAYER_PAUSE
      })

      expect(nextState).to.deep.equal({
        isPlaying: false,
        pos: 4
      })
    })

    it('SET_TRACK', () => {
      const nextState = reducer({
        isPlaying: true,
        track: {},
        pos: 4
      }, {
        type: types.SET_TRACK,
        track: {
          title: 'Ave Maria',
          artist: 'Schubert',
          pl: 'Romance',
          pos: 7
        }
      })

      expect(nextState.pos).to.equal(7)
      expect(nextState.isPlaying).to.be.true
      expect(nextState.currentPl).to.equal('Romance')
      expect(nextState.track).to.deep.equal({
        title: 'Ave Maria',
        artist: 'Schubert',
        pl: 'Romance',
        pos: 7
      })
    })
  })

  describe('[tracks]', () => {
    const previousState = {
      tabs: ['Concerts'],
      pls: {
        'Concerts': [
          {title: 'Morning from Peer Gynt'},
          {title: 'Eine kleine Nachtmusik'},
          {title: 'Minuet'}
        ]
      },
      currentPl: 'Concerts',
      pos: 1,
      isPlaying: true,
      track: {title: 'Eine kleine Nachtmusik'}
    }

    it('PLAYER_NEXT', () => {
      const nextState = reducer(previousState, {
        type: types.PLAYER_NEXT
      })
      expect(nextState.isPlaying).to.be.true
      expect(nextState.pos).to.equal(2)
      expect(nextState.track.title).to.equal('Minuet')
    })

    it('PLAYER_NEXT try to play max+1 track', () => {
      const nextState = reducer(previousState, {
        type: types.PLAYER_NEXT
      })
      const nextNextState = reducer(nextState, {
        type: types.PLAYER_NEXT
      })
      expect(nextNextState.isPlaying).to.be.true
      expect(nextNextState.pos).to.equal(2)
      expect(nextNextState.track.title).to.equal('Minuet')
    })

    it('TRACK_ENDS', () => {
      const nextState = reducer(previousState, {
        type: types.TRACK_ENDS
      })
      expect(nextState.isPlaying).to.be.true
      expect(nextState.pos).to.equal(2)
      expect(nextState.track.title).to.equal('Minuet')
    })

    it('TRACK_ENDS stops playing when no more tracks to play', () => {
      const nextState = reducer(previousState, {
        type: types.TRACK_ENDS
      })
      const nextNextState = reducer(nextState, {
        type: types.TRACK_ENDS
      })
      expect(nextNextState.isPlaying).to.be.false
      expect(nextNextState.pos).to.equal(2)
      expect(nextNextState.track.title).to.equal('Minuet')
    })

    it('PLAYER_PREV', () => {
      const nextState = reducer(previousState, {
        type: types.PLAYER_PREV
      })
      expect(nextState.isPlaying).to.be.true
      expect(nextState.pos).to.equal(0)
      expect(nextState.track.title).to.equal('Morning from Peer Gynt')
    })

    it('PLAYER_PREV tried to get -1 track', () => {
      const nextState = reducer(previousState, {
        type: types.PLAYER_PREV
      })
      const nextNextState = reducer(nextState, {
        type: types.PLAYER_PREV
      })
      expect(nextNextState.isPlaying).to.be.true
      expect(nextNextState.pos).to.equal(0)
      expect(nextNextState.track.title).to.equal('Morning from Peer Gynt')
    })
  })

  describe('[options]', () => {
    it('SET_VOLUME', () => {
      const nextState = reducer(undefined, {
        type: types.SET_VOLUME,
        val: 0.42
      })
      expect(nextState.volume).to.equal(0.42)
    })

    it('TOGGLE_MUTE', () => {
      const nextState = reducer(undefined, {
        type: types.TOGGLE_MUTE
      })
      expect(nextState.muted).to.be.true
    })
  })

  describe('[management of lists]', () => {
    it('CREATE_PLAYLIST', () => {
      const nextState = reducer({
        tabs: ['Default', 'Music'],
        pls: {
          'Default': [],
          'Music': []
        },
        openTab: 'Default'
      }, {
        type: types.CREATE_PLAYLIST,
        name: 'Favorite'
      })
      expect(nextState.tabs).to.deep.equal(['Default', 'Music', 'Favorite'])
      expect(nextState.pls['Favorite']).to.deep.equal([])
      expect(nextState.openTab).to.equal('Favorite')
    })

    it('CREATE_PLAYLIST already exists', () => {
      const nextState = reducer({
        tabs: ['Default', 'Music'],
        pls: {
          'Default': [],
          'Music': []
        },
        openTab: 'Default'
      }, {
        type: types.CREATE_PLAYLIST,
        name: 'Music'
      })
      expect(nextState.tabs).to.deep.equal(['Default', 'Music'])
      expect(nextState.pls['Favorite']).to.equal(undefined)
      expect(nextState.openTab).to.equal('Default')
      expect(nextState.errors.createPlaylist).to.equal('Playlist Music already exists')
    })

    it('CLOSE_OPEN_PLAYLIST', () => {
      const nextState = reducer({
        tabs: ['Music', 'Favorites'],
        pls: {
          'Music': [],
          'Favorites': []
        },
        openTab: 'Favorites'
      }, {
        type: types.CLOSE_OPEN_PLAYLIST
      })
      expect(nextState.tabs).to.deep.equal(['Music'])
      expect(nextState.pls['Favorite']).to.equal(undefined)
      expect(nextState.openTab).to.equal('Music')
    })

    it('CLOSE_OPEN_PLAYLIST when it is the last', () => {
      const nextState = reducer({
        tabs: ['Favorites'],
        pls: {
          'Favorites': []
        },
        openTab: 'Favorites'
      }, {
        type: types.CLOSE_OPEN_PLAYLIST
      })
      expect(nextState.tabs).to.deep.equal(['Default'])
      expect(nextState.pls['Favorite']).to.equal(undefined)
      expect(nextState.openTab).to.equal('Default')
    })

    it('CLOSE_OTHER_PLAYLISTS', () => {
      const nextState = reducer({
        tabs: ['Default', 'Favorites', 'Random'],
        pls: {
          'Default': [],
          'Favorites': [],
          'Random': []
        },
        openTab: 'Favorites'
      }, {
        type: types.CLOSE_OTHER_PLAYLISTS
      })
      expect(nextState.tabs).to.deep.equal(['Favorites'])
      expect(nextState.pls).to.deep.equal({'Favorites': []})
      expect(nextState.openTab).to.equal('Favorites')
      expect(nextState.scrolledTabs).to.equal(0)
    })
  })

  describe('[storage]', () => {
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
        tabs: [],
        pls: {}
      }, {
        type: types.STORAGE_OPEN_PLAYLIST_SUCCESS,
        filename: 'Johann Strauss',
        playlist: [{
          title: 'Emperor Waltz'
        }]
      })

      expect(nextState).to.deep.equal({
        tabs: ['Johann Strauss'],
        pls: {
          'Johann Strauss': [{
            title: 'Emperor Waltz'
          }]
        },
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

  describe('[editing a playlist]', () => {
    const previousState = {
      tabs: ['Favorite', 'Music'],
      pls: {
        'Music': [{
          title: 'The Four Seasons'
        }, {
          title: 'Symphony N9'
        }, {
          title: 'Ave Maria'
        }],
        'Favorite': [{
          title: 'Canon'
        }, {
          title: 'Piano Sonata'
        }, {
          title: 'Winter Road'
        }]
      },
      pos: 2,
      currentPl: 'Music',
      track: {
        title: 'Ave Maria'
      }
    }

    it('REMOVE_TRACK does not affect previous state', () => {
      const oldPls = previousState.pls
      const oldMusic = previousState.pls['Music']

      const nextState = reducer(previousState, {
        type: types.REMOVE_TRACK,
        plName: 'Music',
        pos: 1
      })
      expect(nextState.pls).to.not.equal(oldPls)
      expect(nextState.pls['Music']).to.not.equal(oldMusic)
    })

    it('REMOVE_TRACK remove from previous', () => {
      const nextState = reducer(previousState, {
        type: types.REMOVE_TRACK,
        plName: 'Music',
        pos: 1
      })
      expect(nextState.pls['Music'].length).to.equal(2)
      expect(nextState.pls['Music'][1].title).to.equal('Ave Maria')
      expect(nextState.pos).to.equal(1)
      expect(nextState.track.title).to.equal('Ave Maria')
    })

    it('REMOVE_TRACK remove current', () => {
      const nextState = reducer(previousState, {
        type: types.REMOVE_TRACK,
        plName: 'Music',
        pos: 2
      })
      expect(nextState.pls['Music'].length).to.equal(2)
      expect(nextState.pls['Music'][1].title).to.equal('Symphony N9')
      expect(nextState.pos).to.equal(1)
      expect(nextState.track.title).to.equal('Symphony N9')
    })

    it('REMOVE_TRACK remove after', () => {
      const nextState = reducer({
        ...previousState,
        pos: 1,
        track: {title: 'Symphony N9'}
      }, {
        type: types.REMOVE_TRACK,
        plName: 'Music',
        pos: 2
      })
      expect(nextState.pls['Music'].length).to.equal(2)
      expect(nextState.pls['Music'][1].title).to.equal('Symphony N9')
      expect(nextState.pos).to.equal(1)
      expect(nextState.track.title).to.equal('Symphony N9')
    })

    it('MOVE_TRACK does not affect previous state', () => {
      const oldPls = previousState.pls
      const oldMusic = previousState.pls['Music']
      const oldFavorite = previousState.pls['Favorite']
      const oldMovedTrack = previousState.pls['Music'][0]
      const oldAnotherTrack = previousState.pls['Music'][1]

      const nextState = reducer(previousState, {
        type: types.MOVE_TRACK,
        track: {title: 'The Four Seasons'},
        plFrom: 'Music',
        posFrom: 0,
        plTo: 'Favorite',
        posTo: 0
      })
      expect(nextState.pls).to.not.equal(oldPls)
      expect(nextState.pls['Music']).to.not.equal(oldMusic)
      expect(nextState.pls['Favorite']).to.not.equal(oldFavorite)
      expect(nextState.pls['Music'][0]).to.not.equal(oldMovedTrack)
      expect(nextState.pls['Music'][0]).to.equal(oldAnotherTrack)
    })

    it('MOVE_TRACK from prev position to the beginning of another list', () => {
      const nextState = reducer(previousState, {
        type: types.MOVE_TRACK,
        track: {title: 'The Four Seasons'},
        plFrom: 'Music',
        posFrom: 0,
        plTo: 'Favorite',
        posTo: 0
      })
      expect(nextState.pls['Music'].length).to.equal(2)
      expect(nextState.pls['Music'][0].title).to.equal('Symphony N9')
      expect(nextState.pls['Favorite'].length).to.equal(4)
      expect(nextState.pls['Favorite'][0].title).to.equal('The Four Seasons')
      expect(nextState.pls['Favorite'][1].title).to.equal('Canon')
      expect(nextState.pos).to.equal(1)
      expect(nextState.track.title).to.equal('Ave Maria')
    })

    it('MOVE_TRACK move from previous position to the end of the list', () => {
      const nextState = reducer(previousState, {
        type: types.MOVE_TRACK,
        track: {title: 'Symphony N9'},
        plFrom: 'Music',
        posFrom: 1,
        plTo: 'Music',
        posTo: 3
      })
      expect(nextState.pls['Music'][1].title).to.equal('Ave Maria')
      expect(nextState.pls['Music'][2].title).to.equal('Symphony N9')
      expect(nextState.track.title).to.equal('Ave Maria')
      expect(nextState.pos).to.equal(1)
    })

    it('MOVE_TRACK move current up', () => {
      const nextState = reducer(previousState, {
        type: types.MOVE_TRACK,
        track: {title: 'Ave Maria'},
        plFrom: 'Music',
        posFrom: 2,
        plTo: 'Music',
        posTo: 1
      })
      expect(nextState.pls['Music'][1].title).to.equal('Ave Maria')
      expect(nextState.pls['Music'][2].title).to.equal('Symphony N9')
      expect(nextState.track.title).to.equal('Ave Maria')
      expect(nextState.pos).to.equal(1)
    })

    it('MOVE_TRACK insert track before current', () => {
      const nextState = reducer(previousState, {
        type: types.MOVE_TRACK,
        track: {title: 'Canon'},
        plFrom: null,
        posFrom: null,
        plTo: 'Music',
        posTo: 2
      })
      expect(nextState.pls['Music'][2].title).to.equal('Canon')
      expect(nextState.pls['Music'][3].title).to.equal('Ave Maria')
      expect(nextState.track.title).to.equal('Ave Maria')
      expect(nextState.pos).to.equal(3)
    })
  })

  describe('[sort]', () => {
    const previousState = {
      tabs: ['Music'],
      openTab: 'Music',
      pls: {
        'Music': [{
          title: 'Largo from Serse',
          artist: 'Handel',
          duration: '3:42',
          src: '/Handel/Handel - Largo from Serse.mp3'
        }, {
          title: 'Double Concerto in D Minor',
          artist: ' Bach',
          duration: '2:51',
          src: '/Bach/Bach - Double Concerto in D Minor.mp3'
        }, {
          title: 'Concerto Grosso in A Minor',
          artist: 'Bach',
          duration: '6:61',
          src: '/Bach/Bach - Concerto Grosso in A Minor'
        }]
      },
      pos: 2,
      currentPl: 'Music'
    }

    it('SORT_PLAYLIST BY_TITLE', () => {
      const nextState = reducer(previousState, {
        type: types.SORT_PLAYLIST,
        by: types.BY_TITLE
      })
      const pl = nextState.pls[nextState.openTab]
      expect(pl[0].title).to.equal('Concerto Grosso in A Minor')
      expect(pl[1].title).to.equal('Double Concerto in D Minor')
      expect(pl[2].title).to.equal('Largo from Serse')
      expect(nextState.pos).to.equal(0)
    })

    it('SORT_PLAYLIST BY_ARTIST', () => {
      const nextState = reducer(previousState, {
        type: types.SORT_PLAYLIST,
        by: types.BY_ARTIST
      })
      const pl = nextState.pls[nextState.openTab]
      expect(pl[0].title).to.equal('Double Concerto in D Minor')
      expect(pl[1].title).to.equal('Concerto Grosso in A Minor')
      expect(pl[2].title).to.equal('Largo from Serse')
      expect(nextState.pos).to.equal(1)
    })

    it('SORT_PLAYLIST BY_DURATION', () => {
      const nextState = reducer(previousState, {
        type: types.SORT_PLAYLIST,
        by: types.BY_DURATION
      })
      const pl = nextState.pls[nextState.openTab]
      expect(pl[0].title).to.equal('Double Concerto in D Minor')
      expect(pl[1].title).to.equal('Largo from Serse')
      expect(pl[2].title).to.equal('Concerto Grosso in A Minor')
      expect(nextState.pos).to.equal(2)
    })

    it('SORT_PLAYLIST BY_PATH', () => {
      const nextState = reducer(previousState, {
        type: types.SORT_PLAYLIST,
        by: types.BY_PATH
      })
      const pl = nextState.pls[nextState.openTab]
      expect(pl[0].title).to.equal('Concerto Grosso in A Minor')
      expect(pl[1].title).to.equal('Double Concerto in D Minor')
      expect(pl[2].title).to.equal('Largo from Serse')
      expect(nextState.pos).to.equal(0)
    })

    it('SORT_PLAYLIST SHUFFLE')

    it('SORT_PLAYLIST REVERSE', () => {
      const nextState = reducer(previousState, {
        type: types.SORT_PLAYLIST,
        by: types.REVERSE
      })
      const pl = nextState.pls[nextState.openTab]
      expect(pl[0].title).to.equal('Concerto Grosso in A Minor')
      expect(pl[1].title).to.equal('Double Concerto in D Minor')
      expect(pl[2].title).to.equal('Largo from Serse')
      expect(nextState.pos).to.equal(0)
    })
  })

  describe('[tabs]', () => {
    it('SELECT_TAB', () => {
      const nextState = reducer({
        tabs: ['Marches', 'Opera', 'Piano', 'Concerts', 'Waltzes'],
        openTab: 'Marches',
        scrolledTabs: 0
      }, {
        type: types.SELECT_TAB,
        tabName: 'Concerts'
      })

      expect(nextState.openTab).to.equal('Concerts')
      expect(nextState.scrolledTabs).to.equal(1)
    })

    it('SCROLL_LEFT', () => {
      const nextState = reducer({
        tabs: ['Marches', 'Opera', 'Piano', 'Concerts', 'Waltzes'],
        scrolledTabs: 1
      }, {
        type: types.SCROLL_LEFT
      })
      expect(nextState.scrolledTabs).to.equal(0)
      const nextNextState = reducer(nextState, {
        type: types.SCROLL_LEFT
      })
      expect(nextNextState.scrolledTabs).to.equal(0)
    })

    it('SCROLL_RIGHT', () => {
      const nextState = reducer({
        tabs: ['Marches', 'Opera', 'Piano', 'Concerts', 'Waltzes'],
        scrolledTabs: 1
      }, {
        type: types.SCROLL_RIGHT
      })
      expect(nextState.scrolledTabs).to.equal(2)
    })
  })
})
