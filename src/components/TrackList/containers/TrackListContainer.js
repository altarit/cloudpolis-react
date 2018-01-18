import {connect} from 'react-redux'

import TrackList from '../components/TrackList'
import {updatePlaylist} from "../../../modules/player/playerActions"

const mapDispatchToProps = {
  updateAnotherPlaylist: updatePlaylist
}

const mapStateToProps = (state) => ({
  currentTab: state.player.currentTab,
  track: state.player.track,
  pos: state.player.pos
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackList)
