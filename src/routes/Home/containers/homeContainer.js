import {connect} from 'react-redux'

import Home from '../components/HomeView'
import {getFeaturedTracks} from '../modules/home'
import {updatePlaylist} from '../../../modules/player'

const mapDispatchToProps = {
  getFeaturedTracks,
  updatePlaylist
}

const mapStateToProps = (state, props) => ({
  fetchingTracks: state.home.fetchingTracks,
  tracks: state.home.tracks.slice(0, 5),
  currentPl: state.player.currentPl,
  track: state.player.track,
  pos: state.player.pos,
  sidebar: state.sidebar.isOpen
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
