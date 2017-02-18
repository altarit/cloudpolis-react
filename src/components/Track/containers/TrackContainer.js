import {connect} from 'react-redux'

import Track from '../components/Track'
import {setTrack, pause, moveTrack, removeTrack} from '../../../modules/player/playerActions'
import {openPopup} from '../../../modules/popups'

const mapDispatchToProps = {
  playSong: setTrack,
  pause,
  moveTrack,
  removeTrack,
  openPopup
}

const mapStateToProps = (state, props) => ({
  isPlaying: state.player.isPlaying,
  trackAdd: state.popups.trackAdd,
  src: props.src || props.href,
  currentPl: state.player.currentPl
})

export default connect(mapStateToProps, mapDispatchToProps)(Track)
