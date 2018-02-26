import React from 'react'
import PropTypes from 'prop-types'

import {toMMSS, trackLink} from '../../../modules/formatUtils'

export class AudioPlayer extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    artist: PropTypes.string,
    src: PropTypes.string,
    duration: PropTypes.string,
    trackId: PropTypes.string,

    volume: PropTypes.number.isRequired,
    muted: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,

    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    endTrack: PropTypes.func.isRequired,

    sendSingleStat: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      progress: 0,
      duration: 0
    }
  }

  componentDidMount() {
    let audio = this.refs.audio
    audio.volume = 0.25
  }

  componentWillReceiveProps(nextProps) {
    // console.log('AudioPlayer.componentWillReceiveProps')
    let audio = this.refs.audio
    if (!audio) return

    audio.volume = nextProps.volume

    if (this.props.src !== nextProps.src) {
      console.log('changed src')
      this.props.sendSingleStat(`lib`, nextProps.artist, nextProps.title, nextProps.trackId)
      this.setState({
        ...this.state,
        time: 0,
        progress: 0
      })
      audio.play()
    }

    if (!this.props.isPlaying && nextProps.isPlaying) {
      console.log('changed to played')
      if (audio.ended) {
        audio.currentTime = 0
        audio.play()
      } else {
        audio.play()
      }
    }
    if (this.props.isPlaying && !nextProps.isPlaying) {
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
    })
  }

  handleProgress = () => {
    let audio = this.refs.audio
    let len = audio.buffered.length
    // console.log('PROGRESS: ' + audio.buffered.length);
    if (audio.buffered.length) {
      // let start = audio.buffered.start(len - 1) / this.props.duration;
      let end = audio.buffered.end(len - 1) / audio.duration
      // console.log('===' + end * 100);
      this.setState({
        ...this.state,
        progress: end * 100
      })
    }
  }

  handleDurationChange = () => {
    this.setState({
      ...this.state,
      duration: this.refs.audio.duration
    })
  }

  handleCanPlayThrough = () => {
    // console.log('AudioPlayer.canPlayThrough');
    this.handleProgress()
  }

  handleCanPlay = () => {
    // console.log('AudioPlayer.canPlay');
  }

  handleEnded = () => {
    console.log('AudioPlayer.ended')
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
    let clientRect = e.currentTarget.getBoundingClientRect()
    let progress = (e.pageX - clientRect.left) / clientRect.width
    this.refs.audio.currentTime = progress * (this.refs.audio.duration)

    this.setState({
      ...this.state,
      time: progress * this.props.duration
    })

    // console.log((this.state.time / this.state.duration * 100) + '%')
  }

  dragStart = (e) => {
    e.dataTransfer.setData('track', JSON.stringify(this.props))
  }

  render() {
    return (
      <div
        className='progress player__progress'
        draggable='true'
        onClick={this.changeTime}
        onDragStart={this.dragStart}>

        <div
          className='progress-bar player__progress-played'
          style={{width: (this.state.time / this.state.duration * 100) + '%'}}
        />
        <div
          className='progress-bar progress-bar-striped player__progress-loaded'
          style={{width: this.state.progress + '%'}}
        />
        <div className='player__progress-title'>
          {this.props.title}
        </div>
        <div className='player__progress-info'>
          {this.props.artist}
        </div>
        <div className='player__progress-time'>
          {toMMSS(this.state.time)}
        </div>
        <div className='player__progress-length'>
          {toMMSS(this.state.duration)}
        </div>

        <audio
          autoPlay='autoplay'
          ref='audio'
          src={trackLink(this.props.src)}
          muted={this.props.muted}
          title={this.props.title}

          onTimeUpdate={this.handleTimeUpdate}
          onProgress={this.handleProgress}
          onDurationChange={this.handleDurationChange}
          onCanPlayThrough={this.handleCanPlayThrough}
          onCanPlay={this.handleCanPlay}
          onEnded={this.handleEnded}
          onPause={this.handlePause}
          onPlay={this.handlePlay}
        />
      </div>
    )
  }
}

export default AudioPlayer
