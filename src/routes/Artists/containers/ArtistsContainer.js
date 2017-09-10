import {connect} from 'react-redux'

import {getArtists, changeArtistsFilter} from '../modules/artists'
import Artists from '../components/Artists'

const mapDispatchToProps = {
  getArtists,
  changeArtistsFilter
}

const mapStateToProps = (state) => ({
  fetching: state.artists.fetching,
  artists: state.artists.artists,
  filteredArtists: state.artists.filteredArtists,
})

export default connect(mapStateToProps, mapDispatchToProps)(Artists)
