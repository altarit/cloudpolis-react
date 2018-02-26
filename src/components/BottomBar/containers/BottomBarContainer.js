import {connect} from 'react-redux'

import BottomBar from '../components/BottomBar'
import {toggleSidebar, toggleAudioDetails} from '../../SideBar/modules/sideBar'
import {nextTrack, prevTrack, play, pause} from '../../../modules/player/playerActions'

const mapDispatchToProps = {
  toggleSidebar,
  toggleAudioDetails,
  nextTrack,
  prevTrack,
  play,
  pause
}

const mapStateToProps = (state) => ({
  isPlaying: state.player.isPlaying
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar)
