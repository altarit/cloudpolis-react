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

    updatePlaylist: PropTypes.func
  }

  getPlaylist = () => {
    let current = this.props.songs
    if (current) {
      let currentSrc = this.props.track && (this.props.track.href || this.props.track.src)
      let i = 0
      let isCurrentPl = this.props.currentPl === this.props.pl
      return current.map(track => (
        <Track key={i} {...track}
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
    return <ul className={this.props.className}>
      {this.getPlaylist()}
    </ul>
  }
}

export default TrackList
