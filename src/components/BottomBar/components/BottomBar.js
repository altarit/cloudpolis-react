import React from 'react';
var cn = require('classnames');

import './BottomBar.scss';
import AudioPlayer from './AudioPlayer';

export class BottomBar extends React.Component {

  constructor(props) {
    super(props);
    console.log('BottomBar.constructor');
    this.state = {
      progress: 0
    };

    this.timeUpdate = this.timeUpdate.bind(this);
  }

  timeUpdate(progress) {
    this.setState({
      progress: progress
    });
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

          <div className="progress player__progress">
            <div className="progress-bar progress-bar-info player__progress_played" style={{width: (this.state.progress)+'%'}}>
            </div>
            <div className="progress-bar progress-bar-striped player__progress_loaded" style={{width: '60%'}}>
            </div>
            <div className="player__progress_title">
              Song
            </div>
            <div className="player__progress_time">
              {this.state.progress}
            </div>
            <div className="player__progress_length">
            </div>
          </div>

          <AudioPlayer timeUpdate={this.timeUpdate}
                       isPlayed={this.props.isPlayed}

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
