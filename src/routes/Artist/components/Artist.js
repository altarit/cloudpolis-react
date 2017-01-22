import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import TrackList from '../../../components/TrackList'
import {DEFAULT_PL} from '../../../modules/player'

export class Artist extends React.Component {

  static propTypes = {
    artistName: PropTypes.string.isRequired,
    songs: PropTypes.arrayOf(PropTypes.object),
    library: PropTypes.string,
    count: PropTypes.number,

    getArtist: PropTypes.func.isRequired,
    updatePlaylist: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getArtist(this.props.artistName);
  }

  updatePlaylist = () => {
    this.props.updatePlaylist(null, this.props.songs)
  }

  render() {
    return (
      <div>
        <h2>{this.props.artistName}</h2>
        {this.props.fetching ? (
          <div>Loading...</div>
        ) : (
          <div>
            <TrackList songs={this.props.songs} pl={DEFAULT_PL} immutable={true} updatePlaylist={this.updatePlaylist}/>
          </div>
        )}
      </div>
    )
  }
}

export default Artist;
