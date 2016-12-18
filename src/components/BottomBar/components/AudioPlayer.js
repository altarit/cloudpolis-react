import React from 'react';

export class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    console.log('AudioPlayer.constructor');

    this.timeUpdate = this.timeUpdate.bind(this);
  }

  componentDidMount() {
    console.log('AudioPlayer.componentDidMount');
    let audio = this.refs.audio;
    //audio.play();
    audio.volume = 0.25;
    window.p = audio;
    audio.addEventListener('timeupdate', this.timeUpdate);
    //audio.pause;

    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    console.log('AudioPlayer.componentWillUnmount');
    let audio = this.refs.audio;
    audio.removeEventListener('timeupdate', this.timeUpdate);
  }

  timeUpdate(e) {
    this.props.timeUpdate(this.refs.audio.currentTime);
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





  render() {
    //console.log('AudioPlayer.render: ' + this.props.isPlayed)
    return (
      <audio id="cp_audio" src="song1.mp3" ref="audio"></audio>
    );
  }
}

export default AudioPlayer;
