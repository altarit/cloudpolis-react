import React from 'react';

import {toMMSS} from '../../../modules/formatUtils';

export class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    console.log('AudioPlayer.constructor');

    this.state = {
      time: 0,
      progress: 0,
      duration: 0,
      volume: 0.25
    };
  }

  componentDidMount() {
    console.log('AudioPlayer.componentDidMount');

  }

  componentWillReceiveProps(nextProps) {
    console.log('AudioPlayer.componentWillReceiveProps')
    let audio = this.refs.audio
    if (!audio) return

    if (this.props.src != nextProps.src) {
      console.log('reset')
      this.setState({
        ...this.state,
        time: 0,
        progress: 0,
        duration: 0
      })
    }
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    let audio = this.refs.audio;
    if (!audio) return

    if (this.props.isPlayed == true && audio.paused) {
      if (audio.ended) {
        this.setState({
          ...this.state,
          time: 0,
          progress: 0,
          duration: 0
        })
      }
      audio.play()
    }
    if (!this.props.isPlayed == true && !audio.paused) {
      audio.pause()
    }
  }

  handleTimeUpdate = () => {
    this.setState({
      ...this.state,
      time: this.refs.audio.currentTime
    });
  }

  handleProgress = () => {
    let audio = this.refs.audio;
    let len = audio.buffered.length;
    //console.log('PROGRESS: ' + audio.buffered.length);
    if (audio.buffered.length) {
      //let start = audio.buffered.start(len - 1) / this.props.duration;
      let end = audio.buffered.end(len - 1) / audio.duration;
      //console.log('===' + end * 100);
      this.setState({
        ...this.state,
        progress: end * 100
      });
    }
  }

  handleDurationChange = () => {
    this.setState({
      ...this.state,
      duration: this.refs.audio.duration
    });
  }

  handleCanPlayThrough = () => {
    //console.log('AudioPlayer.canPlayThrough');

    let audio = this.refs.audio;
    //audio.play();
    audio.volume = this.state.volume;
    window.p = audio;
    this.update();
    this.handleProgress();
  }

  handleCanPlay = () => {
    //console.log('AudioPlayer.canPlay');
  }

  handleEnded = () => {
    console.log('AudioPlayer.ended');
    //this.refs.audio.pause();
    this.props.endTrack()
  }


  changeTime = (e) => {
    let progress = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.getBoundingClientRect().width;
    //console.log(progress * this.props.duration);
    this.refs.audio.currentTime = progress * (this.refs.audio.duration)

    this.setState({
      ...this.state,
      time: progress * this.props.duration
    });
  }


  render() {
    //console.log('render')
    //console.log(this.changeTime);
    //console.log('AudioPlayer.render: ' + this.props.isPlayed)
    return (
      <div className="progress player__progress" onClick={this.changeTime}>
        <div className="progress-bar progress-bar-info player__progress_played"
             style={{width: (this.state.time/this.state.duration*100)+'%'}}>
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
          {this.props.duration}
        </div>

        <audio id="cp_audio"
               ref="audio"
               src={this.props.src ? 'http://localhost/artists/' + this.props.src : null}
               onTimeUpdate={this.handleTimeUpdate}
               onProgress={this.handleProgress}
               onDurationChange={this.handleDurationChange}
               onCanPlayThrough={this.handleCanPlayThrough}
               onCanPlay={this.handleCanPlay}
               onEnded={this.handleEnded}
        ></audio>
      </div>
    );
  }
}

export default AudioPlayer;
