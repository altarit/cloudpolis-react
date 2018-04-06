import {connect} from 'react-redux'

import Track from '../components/Track'
import {
  setTrack,
  pause,
  moveTrack,
  removeTrack,
  addToPlaylist,
  trackDragStart,
} from '../../../modules/player/playerActions'
import {openPopup} from '../../../modules/popups'

const mapDispatchToProps = {
  playSong: setTrack,
  pause,
  moveTrack,
  removeTrack,
  openPopup,
  addToPlaylist,
  trackDragStart,
}

const mapStateToProps = (state, props) => ({
  isPlaying: state.player.isPlaying,
  trackAdd: state.popups.trackAdd,
  src: props.src,
  id: props.id,
  currentTab: state.player.currentTab,
  openTab: state.player.openTab,
})

export default connect(mapStateToProps, mapDispatchToProps)(Track)
