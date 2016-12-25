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
        <div className="container_fluid player">
          <div className="player__buttons">
            <button type="button" className="btn player__btn fa fa-fast-backward"/>
            {!this.props.isPlayed ? (
              <button type="button" className="btn player__btn fa fa-play" onClick={this.props.play}/>
            ) : (
              < button type="button" className="btn player__btn fa fa-pause" onClick={this.props.pause}/>
            )}

            <button type="button" className="btn player__btn fa fa-fast-forward"/>
          </div>

          <AudioPlayer isPlayed={this.props.isPlayed}
                       title={this.props.track.title}
                       artist={this.props.track.artist}
                       src={this.props.track.href || this.props.track.src}
                       duration={this.props.track.duration}
          />




          <div className="player__other">
            <button type="button" className="btn player__btn fa fa-bars" onClick={this.props.toogleSidebar}/>
          </div>
        </div>
      </nav>
    );
  }
}

export default BottomBar;
