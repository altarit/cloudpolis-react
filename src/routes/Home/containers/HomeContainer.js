import {connect} from 'react-redux'

import Home from '../components/HomeView'
import {getFeaturedTracks} from '../modules/home'
import {updatePlaylist} from '../../../modules/player/playerActions'

const mapDispatchToProps = {
  getFeaturedTracks,
  updatePlaylist
}

const mapStateToProps = (state, props) => ({
  tracks: state.home.tracks.slice(0, 5),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
