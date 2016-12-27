import {connect} from 'react-redux';

import {getArtist} from '../modules/artist'
import Artist from '../components/Artist'
import {updatePlaylist, setCurrentPlaylist} from '../../../modules/player'

const mapDispatchToProps = {
  getArtist,
  updatePlaylist,
  setCurrentPlaylist
}

const mapStateToProps = (state, props) => ({
  ...state.artist,
  artistName: props.params.artistName,
})

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
