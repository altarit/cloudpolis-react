import {connect} from 'react-redux'

import {getPlaylists} from '../modules/playlists'
import Playlists from '../components/Playlists'
import {updatePlaylist} from '../../../modules/player/playerActions'

const mapDispatchToProps = {
  getPlaylists,
  updatePlaylist,
}

const mapStateToProps = (state, props) => ({
  playlists: state.playlists.playlists,
  fetching: state.playlists.fetching,
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlists)
