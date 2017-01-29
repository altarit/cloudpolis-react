import { connect } from 'react-redux'

import Track from '../components/Track'
import { setTrack, pause, moveTrack, removeTrack } from '../../../modules/player'
import { openPopup } from '../../../modules/popups'

const mapDispatchToProps = {
  playSong: setTrack,
  pause,
  moveTrack,
  removeTrack,
  openPopup
}

const mapStateToProps = (state, props) => ({
  isPlayed: state.player.isPlayed,
  trackAdd: state.popups.trackAdd,
  src: props.src || props.href
})

export default connect(mapStateToProps, mapDispatchToProps)(Track)
