import {connect} from 'react-redux';

import {getArtist} from '../modules/artist'
import Artist from '../components/Artist'

const mapDispatchToProps = {
  getArtist
}

const mapStateToProps = (state, props) => ({
  ...state.artist,
  artistName: props.params.artistName,
})

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
