import React from 'react';
import {Link} from 'react-router';

export class Artists extends React.Component {

  componentDidMount() {
    this.props.getArtists();
  }

  render() {
    return (
      <div>
        <h2>Artists:</h2>
        {this.props.fetching ? (
          <div>Loading...</div>
        ) : (
          <div>
            {
              this.props.artists.map(artist =>
                <div key={artist.name}>
                  <Link to={`/music/artists/${artist.name}`}>{artist.name}</Link>
                </div>
              )
            }
          </div>
        )}
      </div>
    )
  }
}

export default Artists;
