import {connect} from 'react-redux'

import TrackListCustom from '../components/TrackListCustom'
import {updatePlaylist, dropTrack, dropDeleteTrack} from "../../../modules/player/playerActions"

const mapDispatchToProps = {
  updateAnotherPlaylist: updatePlaylist,
  dropTrack,
  dropDeleteTrack
}

const mapStateToProps = (state) => ({
  currentTab: state.player.currentTab,
  openTab: state.player.openTab,
  track: state.player.track,
  pos: state.player.pos,
  isTrackDrag: state.player.drag.isOn,
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackListCustom)
