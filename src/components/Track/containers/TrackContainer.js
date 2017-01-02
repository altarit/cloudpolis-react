import {connect} from 'react-redux'

import Track from '../components/Track'
import {setTrack, pause} from '../../../modules/player'


const mapDispatchToProps = {
  playSong: setTrack,
  pause
}

const mapStateToProps = (state, props) => ({
  isPlayed: state.player.isPlayed
})

export default connect(mapStateToProps, mapDispatchToProps)(Track)
