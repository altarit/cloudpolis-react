import {connect} from 'react-redux'

import TrackListCustom from '../components/TrackListCustom'
import {updatePlaylist, dropTrack} from "../../../modules/player/playerActions"

const mapDispatchToProps = {
  updateAnotherPlaylist: updatePlaylist,
  dropTrack
}

const mapStateToProps = (state) => ({
  currentTab: state.player.currentTab,
  track: state.player.track,
  pos: state.player.pos,
  isTrackDrag: state.player.drag.isOn,
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackListCustom)
