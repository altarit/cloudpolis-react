import {connect} from 'react-redux';

import {getArtists} from '../modules/artists'
import Artists from '../components/Artists'

const mapDispatchToProps = {
  getArtists
}

const mapStateToProps = (state) => ({
  fetching: state.artists.fetching,
  artists: state.artists.artists
})

export default connect(mapStateToProps, mapDispatchToProps)(Artists);
