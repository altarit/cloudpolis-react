import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import TrackList from '../../../components/TrackList'
import {DEFAULT_PL} from '../../../modules/player/playerConstants'

export class Artist extends React.Component {
  static propTypes = {
    artistName: PropTypes.string.isRequired,
    artistsLibrary: PropTypes.string.isRequired,
    tracks: PropTypes.arrayOf(PropTypes.object),
    albums: PropTypes.arrayOf(PropTypes.object),
    fetching: PropTypes.bool,
    view: PropTypes.string,
    albumName: PropTypes.string,

    getArtist: PropTypes.func.isRequired,
    updatePlaylist: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getArtist(this.props.artistsLibrary, this.props.artistName)
    console.log(this.props.albums)
  }

  updatePlaylist = () => {
    if (this.props.albumName === undefined) {
      this.props.updatePlaylist(null, this.props.tracks)
    } else {
      let currentAlbum = (this.props.albums.filter(el => el.name === this.props.albumName)[0] || []).tracks || []
      this.props.updatePlaylist(null, currentAlbum)
    }
  }

  getAlbums = () => {
    return (
      <ul className='libraries-list list-group'>
        {this.props.albums.map(album =>
          <li key={album.name}
            className='list-group-item list-group-item-action
                           flex-row align-items-center d-flex h-100 justify-content-between'>
            <Link className='list-group-item-action'
              to={`/music/libraries/${this.props.artistsLibrary}/${this.props.artistName}?album=${album.name}`}>
              {album.name}
            </Link>
            <button type='button' className='btn btn-def fa'
              data-for='moreCompilationsPopup' data-click='dropdown' data-from={album.name}>
              ...
            </button>
          </li>
        )}
      </ul>
    )
  }

  render() {
    console.log(`Artists.render`)
    return (
      <div className='container'>
        <div>
          <span>
            <Link to={`/music/libraries`}>/libraries/</Link>
            <Link to={`/music/libraries/${this.props.artistsLibrary}`}>{this.props.artistsLibrary}/</Link>
            {this.props.albumName ? (
              <Link to={`/music/libraries/${this.props.artistsLibrary}/${this.props.artistName}/`}>
                {this.props.artistName}/
              </Link>
            ) : null}
          </span>
        </div>
        <h2>{this.props.artistName}</h2>
        <ul className='nav'>
          <li className='nav-item'>
            <Link className='nav-link'
              to={`/music/libraries/${this.props.artistsLibrary}/${this.props.artistName}`}>
              Main
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link'
              to={`/music/libraries/${this.props.artistsLibrary}/${this.props.artistName}?view=tracks`}>
              All Tracks
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link'
              to={`/music/libraries/${this.props.artistsLibrary}/${this.props.artistName}?view=albums`}>
              Albums
            </Link>
          </li>
        </ul>
        {this.props.fetching ? (
          <div>Loading...</div>
        ) : (
          <div>
            {this.props.view === 'albums' ? this.getAlbums()
              : this.props.albumName === undefined ? (
                <TrackList
                  songs={this.props.tracks}
                  pl={DEFAULT_PL}
                  plName={this.props.artistName}
                  immutable
                  updatePlaylist={this.updatePlaylist}
                  controls
                />
              ) : (
                <TrackList
                  songs={(this.props.albums.filter(el => el.name === this.props.albumName)[0] || []).tracks || []}
                  pl={DEFAULT_PL}
                  plName={this.props.artistName}
                  immutable
                  updatePlaylist={this.updatePlaylist}
                  controls
                />
              )}
          </div>
        )}
      </div>
    )
  }
}

export default Artist
