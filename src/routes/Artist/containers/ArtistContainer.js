import {connect} from 'react-redux'

import {getArtist} from '../modules/artist'
import Artist from '../components/Artist'
import {updatePlaylist} from '../../../modules/player/playerActions'

const mapDispatchToProps = {
  getArtist,
  updatePlaylist
}

const mapStateToProps = (state, props) => ({
  tracks: state.artist.tracks,
  albums: state.artist.albums,
  artistName: props.params.artistName,
  artistsLibrary: props.params.artistsLibrary,
  albumName: props.location.query.album,
  view: props.location.query.view,
})

export default connect(mapStateToProps, mapDispatchToProps)(Artist)
