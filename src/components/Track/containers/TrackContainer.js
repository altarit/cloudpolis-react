import {connect} from 'react-redux'

import Track from '../components/Track'
import {setTrack, pause, moveTrack} from '../../../modules/player'


const mapDispatchToProps = {
  playSong: setTrack,
  pause,
  moveTrack
}

const mapStateToProps = (state, props) => ({
  isPlayed: state.player.isPlayed
})

export default connect(mapStateToProps, mapDispatchToProps)(Track)
