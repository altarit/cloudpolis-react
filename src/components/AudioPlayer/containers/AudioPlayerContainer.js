import {connect} from 'react-redux'

import AudioPlayer from '../components/AudioPlayer'
import {play, pause, endTrack} from '../../../modules/player/playerActions'
import {sendSingleStat} from '../../../modules/stats'

const mapDispatchToProps = {
  play,
  pause,
  endTrack,
  sendSingleStat
}

const mapStateProps = (state) => ({
  title: state.player.track.title,
  artist: state.player.track.artist,
  src: state.player.track.src,
  duration: state.player.track.duration,
  compilation: state.player.track.compiltaion,

  isPlaying: state.player.isPlaying,
  volume: state.player.volume,
  muted: state.player.muted
})

export default connect(mapStateProps, mapDispatchToProps)(AudioPlayer)
