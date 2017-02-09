import {connect} from 'react-redux'

import OpenPlaylistDialog from '../components/OpenPlaylistDialog'
import {
  loadPlaylistsFromStorage,
  savePlaylistsToStorage,
  openPlaylistFromStorage,
  deletePlaylistFromStorage
} from '../../../modules/player'

const mapDispatchToProps = {
  loadPlaylistsFromStorage,
  savePlaylistsToStorage,
  openPlaylistFromStorage,
  deletePlaylistFromStorage
}

const mapStateToProps = (state) => ({
  safePlaylists: state.player.safePlaylists
})

export default connect(mapStateToProps, mapDispatchToProps)(OpenPlaylistDialog)
