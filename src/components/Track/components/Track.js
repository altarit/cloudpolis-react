import React from 'react'

import './Track.scss'

export class Track extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isAbove: null
    }
  }

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

  dragStart = (e) => {
    //console.log('start ' + this.props.pos)
    e.dataTransfer.setData('pos', this.props.pos)
    e.dataTransfer.setData('pl', this.props.pl)
    e.dataTransfer.setData('track', JSON.stringify(this.props))
  }

  drop = (e) => {
    if (!this.props.mutable) return

    e.preventDefault()
    e.stopPropagation()
    this.setState({isAbove: null})
    let track = JSON.parse(e.dataTransfer.getData('track'))
    if (track.immutable) {
      console.log('immutable')
      this.props.moveTrack(track, null, null, this.props.pl, this.props.pos)
    } else {
      this.props.moveTrack(track, e.dataTransfer.getData('pl'), e.dataTransfer.getData('pos'), this.props.pl, this.props.pos)
    }
  }

  dragOver = (e) => {
    if (!this.props.mutable) return
    e.preventDefault()
    this.setState({isAbove: true})
  }

  dragLeave = (e) => {
    if (!this.props.mutable) return
    e.preventDefault()
    this.setState({isAbove: null})
  }

  render() {
    return (
      <li className={"track" + (this.props.playing && " playing" || "")}
          style={{
            borderTopStyle: this.state.isAbove ? 'solid' : null,
          }}
          draggable="true" onDragStart={this.dragStart}
          onDrop={this.drop} onDragOver={this.dragOver} onDragLeave={this.dragLeave}>
        <div className="track__cover" onClick={this.handlePlayButton}>
          <span className={this.props.playing && this.props.isPlayed ? "fa fa-pause" : "fa fa-play"}></span>
        </div>
        <div className="track__info" onDoubleClick={this.handlePlayButton}>
          <div className="track__title">{this.props.title}</div>
          <div className="track__artist">{this.props.artist} ({this.props.pl}:{this.props.pos})</div>
        </div>

        <div className="track__control">
          <button type="button" className="btn fa fa-plus"
                  data-click="dropdown" data-for={this.props.mutable ? "trackAdd" : "trackImmutable"} data-from={this.props.pos} data-pl={this.props.pl}/>
        </div>
        <div className="track__end">
          {this.props.duration}
        </div>
      </li>


    )
  }
}

export default Track
