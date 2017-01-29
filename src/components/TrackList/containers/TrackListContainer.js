import { connect } from 'react-redux'

import TrackList from '../components/TrackList'
import { moveTrack } from '../../../modules/player'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
  currentPl: state.player.currentPl,
  track: state.player.track,
  pos: state.player.pos
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackList)
