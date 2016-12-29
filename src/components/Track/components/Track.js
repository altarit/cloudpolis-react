import React from 'react'

import './Track.scss'

export class Track extends React.Component {

  handlePlayButton = () => {
    this.props.playSong(this.props)
    if (this.props.updatePlaylist) {
      this.props.updatePlaylist()
    }
  }

  render() {
    return (
      <li className={"track" + (this.props.playing && " playing" || "")} >
        <div className="track__cover" onClick={this.handlePlayButton}>
          <span className="fa fa-play"></span>
        </div>
        <div className="track__info">
          <div className="track__title">{this.props.title} {this.props.playing ? '+' : '-'}</div>
          <div className="track__artist">{this.props.artist}</div>
        </div>

        <div className="track__end">
          {this.props.duration}
        </div>
        <div className="track__control">
          <button type="button" className="btn fa fa-plus" data-click="dropdown" data-for="trackAdd"/>
        </div>
        <div className="track__clear_left"></div>
      </li>


    )
  }
}

export default Track
