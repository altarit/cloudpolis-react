import {connect} from 'react-redux'

import TrackList from '../components/TrackList'
import {updatePlaylist} from '../../../modules/player/playerActions'

const mapDispatchToProps = {
  updatePlaylist
}

const mapStateToProps = (state) => ({
  currentPl: state.player.currentPl,
  track: state.player.track,
  pos: state.player.pos
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackList)
