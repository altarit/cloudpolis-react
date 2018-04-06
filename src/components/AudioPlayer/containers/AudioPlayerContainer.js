import {connect} from 'react-redux'

import AudioPlayer from '../components/AudioPlayer'
import {play, pause, endTrack} from '../../../modules/player/playerActions'
import {getTrackDetails} from '../../AudioDetails/modules/audioDetails'
const mapDispatchToProps = {
  play,
  pause,
  endTrack,
  sendSingleStat: getTrackDetails
}

const mapStateProps = (state) => ({
  title: state.player.track.title,
  artist: state.player.track.artist,
  src: state.player.track.src,
  duration: state.player.track.duration,
  compilation: state.player.track.compiltaion,
  trackId: state.player.track.id,

  isPlaying: state.player.isPlaying,
  volume: state.player.volume,
  muted: state.player.muted
})

export default connect(mapStateProps, mapDispatchToProps)(AudioPlayer)
