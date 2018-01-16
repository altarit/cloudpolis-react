import {connect} from 'react-redux'

import {getArtist} from '../modules/artist'
import Artist from '../components/Artist'
import {updatePlaylist} from '../../../modules/player/playerActions'

const mapDispatchToProps = {
  getArtist,
  updatePlaylist
}

const mapStateToProps = (state, props) => {
  const query = new URLSearchParams(props.location.search)
  return {
    tracks: state.artist.tracks,
    albums: state.artist.albums,
    artistName: props.match.params.artistName,
    artistsLibrary: props.match.params.artistsLibrary,
    albumName: query.album,
    view: query.view,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Artist)
