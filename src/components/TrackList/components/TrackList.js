import React, {PropTypes} from 'react'

import Track from '../../Track'

export class TrackList extends React.Component {
  static propTypes = {
    songs: PropTypes.arrayOf(PropTypes.object).isRequired,
    track: PropTypes.object,
    pos: PropTypes.number,
    currentPl: PropTypes.string,
    pl: PropTypes.string.isRequired,
    className: PropTypes.string,
    immutable: PropTypes.bool.isRequired,
    controls: PropTypes.bool,

    updatePlaylist: PropTypes.func
  }

  getPlaylist = () => {
    let current = this.props.songs
    if (current) {
      let currentSrc = this.props.track && (this.props.track.href || this.props.track.src)
      let i = 0
      let isCurrentPl = this.props.currentPl === this.props.pl
      return current.map(track => (
        <Track
          {...track}
          key={i}
          isCurrent={isCurrentPl && !!currentSrc && this.props.pos === i && (track.src || track.href) === currentSrc}
          pl={this.props.pl}
          pos={i++}
          immutable={this.props.immutable}
          updatePlaylist={this.props.updatePlaylist}
        />
      ))
    } else {
      return <div>Empty</div>
    }
  }

  render() {
    return (
      <div>
        {this.props.controls ? (
          <div className='d-flex justify-content-between'>
            <div className='d-flex'>
              <button className='btn btn-outline-secondary mr-2'>
                Listen All
              </button>
              <button className='btn btn-outline-secondary'>
                Add to Playlist
              </button>
            </div>
            <div className='d-flex' />
          </div>
        ) : null}
        <ul className={this.props.className}>
          {this.getPlaylist()}
        </ul>
      </div>
    )
  }
}

export default TrackList
