import {connect} from 'react-redux'

import AudioPlayer from '../components/AudioPlayer'
import {play, pause, endTrack} from '../../../modules/player/playerActions'

const mapDispatchToProps = {
  play,
  pause,
  endTrack
}

const mapStateProps = (state) => ({
  title: state.player.track.title,
  artist: state.player.track.artist,
  src: state.player.track.href || state.player.track.src,
  duration: state.player.track.duration,
  compilation: state.player.track.compiltaion,

  isPlayed: state.player.isPlayed,
  volume: state.player.volume,
  muted: state.player.muted
})

export default connect(mapStateProps, mapDispatchToProps)(AudioPlayer)
