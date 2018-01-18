import {connect} from 'react-redux'

import Track from '../components/Track'
import {
  setTrack,
  pause,
  moveTrack,
  removeTrack,
  addToPlaylist,
} from '../../../modules/player/playerActions'
import {openPopup} from '../../../modules/popups'

const mapDispatchToProps = {
  playSong: setTrack,
  pause,
  moveTrack,
  removeTrack,
  openPopup,
  addToPlaylist,
}

const mapStateToProps = (state, props) => ({
  isPlaying: state.player.isPlaying,
  trackAdd: state.popups.trackAdd,
  src: props.src,
  currentPl: state.player.currentPl,
  openTab: state.player.openTab,
})

export default connect(mapStateToProps, mapDispatchToProps)(Track)
