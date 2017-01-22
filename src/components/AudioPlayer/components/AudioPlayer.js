import React from 'react';

import {toMMSS, trackLink} from '../../../modules/formatUtils';

export class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    console.log('AudioPlayer.constructor');

    this.state = {
      time: 0,
      progress: 0,
      duration: 0
    };
  }

  componentDidMount() {
    console.log('AudioPlayer.componentDidMount');

  }

  componentWillReceiveProps(nextProps) {
    //console.log('AudioPlayer.componentWillReceiveProps')
    let audio = this.refs.audio
    if (!audio) return


    audio.volume = nextProps.volume

    if (this.props.src != nextProps.src) {
      console.log('changed src')
      //console.log('reset')
      this.setState({
        ...this.state,
        time: 0,
        progress: 0/*,
        duration: 0  */
      })
      audio.play()
    }

    if (!this.props.isPlayed && nextProps.isPlayed) {
      console.log('changed to played')
      if (audio.ended) {
        audio.currentTime = 0
        audio.play()
      } else {
        audio.play()
      }
    }
    if (this.props.isPlayed && !nextProps.isPlayed) {
      console.log('changed to paused')
      audio.pause()
    }
  }

  componentDidUpdate() {
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
    window.p = audio;
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

  handlePause = (e) => {
    console.log('AudioPlayer.pause')
    this.props.pause()
  }

  handlePlay = (e) => {
    console.log('AudioPlayer.play')
    this.props.play()
  }


  changeTime = (e) => {
    let progress = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.getBoundingClientRect().width;
    //console.log(progress * this.props.duration);
    this.refs.audio.currentTime = progress * (this.refs.audio.duration)

    this.setState({
      ...this.state,
      time: progress * this.props.duration
    });

    console.log((this.state.time/this.state.duration*100)+'%')
  }

  dragStart = (e) => {
    e.dataTransfer.setData('track', JSON.stringify(this.props))
  }


  render() {
    return (
      <div className="progress player__progress" onClick={this.changeTime}
           draggable="true" onDragStart={this.dragStart}>
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

        <audio autoPlay="autoplay"
               ref="audio"
               src={trackLink(this.props.src)}
               onTimeUpdate={this.handleTimeUpdate}
               onProgress={this.handleProgress}
               onDurationChange={this.handleDurationChange}
               onCanPlayThrough={this.handleCanPlayThrough}
               onCanPlay={this.handleCanPlay}
               onEnded={this.handleEnded}
               onPause={this.handlePause}
               onPlay={this.handlePlay}
        ></audio>
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  title: React.PropTypes.string,
  artist: React.PropTypes.string,
  src: React.PropTypes.string,
  duration: React.PropTypes.string,

  volume: React.PropTypes.number.isRequired,
  muted: React.PropTypes.bool.isRequired,
  isPlayed: React.PropTypes.bool.isRequired,

  play: React.PropTypes.func.isRequired,
  pause: React.PropTypes.func.isRequired,
  endTrack: React.PropTypes.func.isRequired
}

export default AudioPlayer;
