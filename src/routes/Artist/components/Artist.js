import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import TrackList from '../../../components/TrackList'
import {DEFAULT_PL} from '../../../modules/player/playerConstants'

export class Artist extends React.Component {
  static propTypes = {
    artistName: PropTypes.string.isRequired,
    artistsLibrary: PropTypes.string.isRequired,
    tracks: PropTypes.arrayOf(PropTypes.object),
    albums: PropTypes.arrayOf(PropTypes.object),
    library: PropTypes.string,
    count: PropTypes.number,
    fetching: PropTypes.bool,
    view: PropTypes.string,
    albumName: PropTypes.string,

    getArtist: PropTypes.func.isRequired,
    updatePlaylist: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getArtist(this.props.artistsLibrary, this.props.artistName)
  }

  updatePlaylist = () => {
    this.props.updatePlaylist(null, this.props.tracks)
  }

  render() {
    return (
      <div className='container'>
        <h2>{this.props.artistName}</h2>
        <h3>{this.props.artistsLibrary}</h3>
        <div>
          <Link to={`/music/artists/${this.props.artistsLibrary}/${this.props.artistName}?view=tracks`}>
            All Tracks
          </Link>
          <Link to={`/music/artists/${this.props.artistsLibrary}/${this.props.artistName}?view=albums`}>
            Albums
          </Link>
        </div>
        {this.props.fetching ? (
          <div>Loading...</div>
        ) : (
          <div>
            {this.props.view === 'albums' ? this.props.albums.map((album) => (
              <Link
                key={album.name}
                to={`/music/artists/${this.props.artistsLibrary}/${this.props.artistName}?album=${album.name}`}
              >
                {album.name}
              </Link>
            )) : this.props.albumName === undefined ? (
              <TrackList
                songs={this.props.tracks}
                pl={DEFAULT_PL}
                immutable
                updatePlaylist={this.updatePlaylist}
              />
            ) : (
              <TrackList
                songs={(this.props.albums.filter(el => el.name === this.props.albumName)[0] || []).tracks || []}
                pl={DEFAULT_PL}
                immutable
                updatePlaylist={this.updatePlaylist}
              />
            )}
          </div>
        )}
      </div>
    )
  }
}

export default Artist
