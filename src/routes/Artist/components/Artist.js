import React from 'react';
import {Link} from 'react-router';

import Track from '../../../components/Track'
import {DEFAULT_PL} from '../../../modules/player'

export class Artist extends React.Component {

  componentDidMount() {
    this.props.getArtist(this.props.artistName);
  }

  updatePlaylist = () => {
    this.props.updatePlaylist(null, this.props.songs)
  }

  getPlaylist = () => {
    let current = this.props.songs
    if (current) {
      let currentSrc = this.props.track && (this.props.track.href || this.props.track.src)
      return current.map(track => (
        <Track key={track.href} {...track}
               updatePlaylist={this.updatePlaylist}
               playing={currentSrc && (track.src || track.href) == currentSrc && (this.props.currentPl == DEFAULT_PL)}
               pl={DEFAULT_PL}
        />
      ))
    } else {
      return <div>Empty</div>
    }
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
                {this.getPlaylist()}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Artist;
