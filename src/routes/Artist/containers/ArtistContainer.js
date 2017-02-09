import {connect} from 'react-redux'

import {getArtist} from '../modules/artist'
import Artist from '../components/Artist'
import {updatePlaylist} from '../../../modules/player'

const mapDispatchToProps = {
  getArtist,
  updatePlaylist
}

const mapStateToProps = (state, props) => ({
  songs: state.artist.songs,
  library: state.artist.library,
  count: state.artist.count,
  artistName: props.params.artistName
})

export default connect(mapStateToProps, mapDispatchToProps)(Artist)
