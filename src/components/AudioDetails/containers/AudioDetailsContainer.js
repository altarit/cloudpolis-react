import {connect} from 'react-redux'

import AudioDetails from '../components/AudioDetails'
import {toggleAudioDetails} from '../../SideBar/modules/sideBar'
import {
  enableInfoEditMode,
  enableLyricsEditMode,
  disableEditMode,
  updateLyrics
} from '../modules/audioDetails'
import {nextTrack, prevTrack, play, pause} from '../../../modules/player/playerActions'

const mapDispatchToProps = {
  enableInfoEditMode, enableLyricsEditMode, disableEditMode, updateLyrics,
  toggleAudioDetails,
  nextTrack,
  prevTrack,
  play,
  pause
}

const mapStateToProps = (state) => ({
  isPlaying: state.player.isPlaying,
  isDetailsOpen: state.sidebar.isDetailsOpen,
  isInfoEditMode: state.audioDetails.isInfoEditMode,
  isLirycsEditMode: state.audioDetails.isLirycsEditMode,

  track: state.player.track || {},
  lyrics: state.audioDetails.lyrics,
})

export default connect(mapStateToProps, mapDispatchToProps)(AudioDetails)
