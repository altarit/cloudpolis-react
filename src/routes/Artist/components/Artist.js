import React from 'react';
import {Link} from 'react-router';

import Song from '../../../components/Song'

export class Artist extends React.Component {

  componentDidMount() {
    this.props.getArtist(this.props.artistName);
  }


  render() {
    return (
      <div>
        {this.props.fetching ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h2>{this.props.name}!</h2>
            <div>
              {this.props.songs.map(song =>
                <Song key={song.href} {...song} />
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Artist;
