import {connect} from 'react-redux'

import OpenPlaylistDialog from '../components/OpenPlaylistDialog'
import {
  loadPlaylistsFromStorage,
  savePlaylistToStorage,
  openPlaylistFromStorage,
  deletePlaylistFromStorage,
  getServerPlaylists,
  putServerPlaylist,
  selectOpenDialogLocalTab,
  openServerPlaylist,
  deleteServerPlaylist,
} from '../../../modules/player/playerStorage'

const mapDispatchToProps = {
  loadPlaylistsFromStorage,
  savePlaylistToStorage,
  openPlaylistFromStorage,
  deletePlaylistFromStorage,
  getServerPlaylists,
  putServerPlaylist,
  selectOpenDialogLocalTab,
  openServerPlaylist,
  deleteServerPlaylist,
}

const mapStateToProps = (state) => ({
  safePlaylists: state.player.safePlaylists,
  serverPlaylists: state.player.serverPlaylists,
  isLocal: state.player.isLocal,
  userName: state.auth.name,
})

export default connect(mapStateToProps, mapDispatchToProps)(OpenPlaylistDialog)
