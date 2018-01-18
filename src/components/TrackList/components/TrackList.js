import React from 'react'
import PropTypes from 'prop-types'

import Track from '../../Track'

export class TrackList extends React.Component {
  static propTypes = {
    songs: PropTypes.arrayOf(PropTypes.object).isRequired,
    track: PropTypes.object,
    pos: PropTypes.number,
    currentTab: PropTypes.string,
    pl: PropTypes.string.isRequired,
    plName: PropTypes.string,
    className: PropTypes.string,
    immutable: PropTypes.bool.isRequired,
    controls: PropTypes.bool,

    updatePlaylist: PropTypes.func,
    updateAnotherPlaylist: PropTypes.func,
  }

  getPlaylist = () => {
    let current = this.props.songs
    if (current) {
      let currentSrc = this.props.track && this.props.track.src
      let i = 0
      let isCurrentPl = this.props.currentTab === this.props.pl
      return current.map(track => (
        <Track
          {...track}
          key={i}
          isCurrent={isCurrentPl && !!currentSrc && this.props.pos === i && track.src === currentSrc}
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

  openInPlaylist = () => {
    this.props.updateAnotherPlaylist(this.props.plName || this.props.pl, this.props.songs)
  }

  render() {
    return (
      <div>
        {this.props.controls ? (
          <div className='d-flex justify-content-between'>
            <div className='d-flex'>
              <button className='btn btn-outline-secondary mr-2' onClick={this.openInPlaylist}>
                Open New Tab
              </button>
              <button className='btn btn-outline-secondary'>
                Add To Tab ...
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
