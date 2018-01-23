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
} from '../../../modules/player/storage/storageActions'

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
  tabs: state.player.tabs,
  isLocal: state.player.isLocal,
  userName: state.auth.name,
})

export default connect(mapStateToProps, mapDispatchToProps)(OpenPlaylistDialog)
