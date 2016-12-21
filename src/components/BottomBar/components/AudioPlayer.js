import React from 'react';

import {toMMSS} from '../../../modules/formatUtils';

export class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    console.log('AudioPlayer.constructor');

    this.state = {
      time: 0,
      progress: 0
    };
  }

  componentDidMount() {
    console.log('AudioPlayer.componentDidMount');
    let audio = this.refs.audio;
    //audio.play();
    audio.volume = 0.25;
    window.p = audio;
    audio.addEventListener('timeupdate', this.handleTimeUpdate);
    audio.addEventListener('progress', this.handleProgress);
    //audio.pause;

    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    console.log('AudioPlayer.componentWillUnmount');
    let audio = this.refs.audio;
    audio.removeEventListener('timeupdate', this.handleTimeUpdate);
    audio.addEventListener('progress', this.handleProgress);
  }


  update() {
    let audio = this.refs.audio;

    if (this.props.isPlayed == true) {
      //console.log('AudioPlayer.render: ' + this.props.isPlayed);
      if (audio.paused) {
        audio.play();
      }
    } else {
      if (!audio.paused) {
        audio.pause();
      }
    }
  }

  handleTimeUpdate = () => {
    this.setState({
      time: this.refs.audio.currentTime,
      progress: this.state.progress
    });
  }

  handleProgress = () => {
    let audio = this.refs.audio;
    let len = audio.buffered.length;
    //console.log('PROGRESS: ' + audio.buffered.length);
    if (audio.buffered.length) {
      //let start = audio.buffered.start(len - 1) / this.props.duration;
      let end = audio.buffered.end(len - 1) / this.props.duration;
      //console.log('===' + end * 100);
      this.setState({
        time: this.state.time,
        progress: end * 100
      });
    }
  }


  changeTime = (e) => {
    //window.e = e;
    let progress = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.getBoundingClientRect().width;
    console.log(progress * this.props.duration);
    this.refs.audio.currentTime = progress * this.props.duration;

    this.setState({
      time: progress * this.props.duration,
      progress: this.state.progress
    });
  }


  render() {
    //console.log(this.changeTime);
    //console.log('AudioPlayer.render: ' + this.props.isPlayed)
    return (
      <div className="progress player__progress" onClick={this.changeTime}>
        <div className="progress-bar progress-bar-info player__progress_played"
             style={{width: (this.state.time/this.props.duration*100)+'%'}}>
        </div>
        <div className="progress-bar progress-bar-striped player__progress_loaded"
             style={{width: this.state.progress+'%'}}>
        </div>
        <div className="player__progress_title">
          <b>{this.props.title}</b>
        </div>
        <div className="player__progress_info">
          {this.props.artist}
        </div>
        <div className="player__progress_time">
          {toMMSS(this.state.time)}
        </div>
        <div className="player__progress_length">
          {toMMSS(this.props.duration)}
        </div>
        <audio id="cp_audio" src={this.props.src} ref="audio"></audio>
      </div>
    );
  }
}

export default AudioPlayer;
