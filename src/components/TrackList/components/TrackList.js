import React, { PropTypes } from 'react'

import Track from '../../Track'
import { SEARCH_PL } from '../../../modules/player'

export class TrackList extends React.Component {

  getPlaylist = () => {
    let current = this.props.songs
    if (current) {
      let currentSrc = this.props.track && (this.props.track.href || this.props.track.src)
      let i = 0
      return current.map(track => (
        <Track key={i} {...track}
          playing={currentSrc && this.props.pos === i && (track.src || track.href) == currentSrc && (this.props.currentPl == this.props.pl)}
          pl={this.props.pl}
          pos={i++}
          immutable={this.props.immutable}
          mutable={this.props.mutable}
          updatePlaylist={this.props.updatePlaylist}
        />
      ))
    } else {
      return <div>Empty</div>
    }
  }

  render () {
    return <ul className={this.props.className}>
      {this.getPlaylist()}
    </ul>
  }
}

export default TrackList
