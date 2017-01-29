import { connect } from 'react-redux'

import BottomBar from '../components/BottomBar'

import { toggleSidebar } from '../../../components/Sidebar/modules/sidebar'
import { nextTrack, prevTrack, play, pause } from '../../../modules/player'

const mapDispatchToProps = {
  toggleSidebar,
  nextTrack,
  prevTrack,
  play,
  pause
}

const mapStateToProps = (state) => ({
  isPlayed: state.player.isPlayed
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar)
