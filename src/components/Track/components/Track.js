import React from 'react'

import './Track.scss'

export class Track extends React.Component {

  handlePlayButton = () => {
    if (this.props.playing && this.props.isPlayed) {
      this.props.pause()
    } else {
      this.props.playSong(this.props)
      if (this.props.updatePlaylist) {
        this.props.updatePlaylist()
      }
    }
  }

  render() {
    return (
      <li className={"track" + (this.props.playing && " playing" || "")}>
        <div className="track__cover" onClick={this.handlePlayButton}>
          <span className={this.props.playing && this.props.isPlayed ? "fa fa-pause" : "fa fa-play"}></span>
        </div>
        <div className="track__info" onDoubleClick={this.handlePlayButton}>
          <div className="track__title">{this.props.title}</div>
          <div className="track__artist">{this.props.artist}</div>
        </div>

        <div className="track__control">
          <button type="button" className="btn fa fa-plus"
                  data-click="dropdown" data-for="trackAdd" data-from={this.props.title}/>
        </div>
        <div className="track__end">
          {this.props.duration}
        </div>
      </li>


    )
  }
}

export default Track
