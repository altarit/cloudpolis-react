import {connect} from 'react-redux'

import OpenPlaylistDialog from '../components/OpenPlaylistDialog'
import {
  loadPlaylistsFromStorage,
  savePlaylistToStorage,
  openPlaylistFromStorage,
  deletePlaylistFromStorage
} from '../../../modules/player/playerStorage'

const mapDispatchToProps = {
  loadPlaylistsFromStorage,
  savePlaylistToStorage,
  openPlaylistFromStorage,
  deletePlaylistFromStorage
}

const mapStateToProps = (state) => ({
  safePlaylists: state.player.safePlaylists
})

export default connect(mapStateToProps, mapDispatchToProps)(OpenPlaylistDialog)
