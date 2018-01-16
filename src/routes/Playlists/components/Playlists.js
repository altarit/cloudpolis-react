import React from 'react'
import PropTypes from 'prop-types'

import TrackList from '../../../components/TrackList'
// import {DEFAULT_PL} from '../../../modules/player/playerConstants'

export class Playlists extends React.Component {
  static propTypes = {
    playlists: PropTypes.arrayOf(PropTypes.object),
    fetching: PropTypes.bool.isRequired,

    getPlaylists: PropTypes.func.isRequired,
    updatePlaylist: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getPlaylists()
    console.log(this.props)
  }

  updatePlaylist = (playlist) => {
    // if (this.props.albumName === undefined) {
    //   this.props.updatePlaylist(null, this.props.tracks)
    // } else {
    //   let currentAlbum = (this.props.albums.filter(el => el.name === this.props.albumName)[0] || []).tracks || []
    //   this.props.updatePlaylist(null, currentAlbum)
    // }
    this.props.updatePlaylist(playlist.name, playlist.tracks)
  }

  render() {
    return (
      <div className='container'>
        <h2>Playlists:</h2>
        {this.props.fetching ? (
          <div>Loading...</div>
        ) : (
          <div>
            {this.props.playlists.map(curr =>
              <div key={`${curr.name}:${curr.owner}`}>
                <h4>{`${curr.name}:${curr.owner}`}</h4>
                <TrackList
                  songs={curr.tracks}
                  pl={curr.name}
                  immutable='true'
                  updatePlaylist={() => this.updatePlaylist(curr)}
                />
              </div>
            )}
          </div>
        )}

      </div>
    )
  }
}

export default Playlists
