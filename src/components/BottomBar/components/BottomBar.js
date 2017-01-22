import React from 'react'

import './BottomBar.scss'
import AudioPlayer from '../../AudioPlayer'

export class BottomBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-bottom">
        <div className="container player">
          <div className="player__buttons">
            <button type="button" className="btn player__btn fa fa-fast-backward" onClick={this.props.prevTrack}/>
            {!this.props.isPlayed ? (
              <button type="button" className="btn player__btn fa fa-play" onClick={this.props.play}/>
            ) : (
              < button type="button" className="btn player__btn fa fa-pause" onClick={this.props.pause}/>
            )}
            <button type="button" className="btn player__btn fa fa-fast-forward" onClick={this.props.nextTrack}/>
          </div>

          <AudioPlayer/>

          <div className="player__other">
            <button type="button" className="btn player__btn fa fa-bars" onClick={this.props.toggleSidebar}/>
          </div>
        </div>
      </nav>
    )
  }
}

BottomBar.propTypes = {
  isPlayed: React.PropTypes.bool.isRequired,

  toggleSidebar: React.PropTypes.func.isRequired,
  nextTrack: React.PropTypes.func.isRequired,
  prevTrack: React.PropTypes.func.isRequired,
  play: React.PropTypes.func.isRequired,
  pause: React.PropTypes.func.isRequired
}

export default BottomBar
