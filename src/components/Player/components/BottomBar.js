import React from 'react';
var cn = require('classnames');

import './BottomBar.scss';
import AudioPlayer from './AudioPlayer';

export class BottomBar extends React.Component {

  constructor(props) {
    super(props);
    console.log('BottomBar.constructor');

  }

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

          <AudioPlayer isPlayed={this.props.isPlayed}
                       title={this.props.track.title}
                       artist={this.props.track.artist}
                       src={this.props.track.href || this.props.track.src}
                       duration={this.props.track.duration}

                       volume={this.props.volume}
                       muted={this.props.muted}

                       endTrack={this.props.endTrack}
                       play={this.props.play}
                       pause={this.props.pause}
          />
          <div className="player__other">
            <button type="button" className="btn player__btn fa fa-bars" onClick={this.props.toggleSidebar}/>
          </div>
        </div>
      </nav>
    );
  }
}

export default BottomBar;
