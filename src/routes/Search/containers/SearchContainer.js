import {connect} from 'react-redux';

import {getTracksByQuery} from '../modules/search'
import Search from '../components/Search'
import {updatePlaylist, setCurrentPlaylist} from '../../../modules/player'

const mapDispatchToProps = {
  getTracksByQuery,
  updatePlaylist,
  setCurrentPlaylist
}

const mapStateToProps = (state, props) => ({
  ...state.search,
  currentPl: state.player.currentPl,
  track: state.player.track,
  pos: state.player.pos
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);
