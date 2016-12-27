import React from 'react';
import {Link} from 'react-router';

import Track from '../../../components/Track'

export class Artist extends React.Component {

  componentDidMount() {
    this.props.getArtist(this.props.artistName);
  }

  updatePlaylist = () => {
    this.props.updatePlaylist(null, this.props.songs)
    //this.props.setCurrentPlaylist()
  }


  render() {
    return (
      <div>
        <h2>{this.props.artistName}</h2>
        {this.props.fetching ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div>
              <ul>
                {this.props.songs.map(song =>
                  <Track key={song.href} {...song}
                        updatePlaylist={this.updatePlaylist}/>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Artist;
