import React, {PropTypes} from 'react'

import './BottomBar.scss'
import AudioPlayer from '../../AudioPlayer'

export class BottomBar extends React.Component {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,

    toggleSidebar: PropTypes.func.isRequired,
    nextTrack: PropTypes.func.isRequired,
    prevTrack: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired
  }

  render() {
    return (
      <nav className='navbar fixed-bottom navbar-light bg-faded'>
        <div className='container player'>
          <button type='button' className='btn btn-def player__btn fa fa-fast-backward' onClick={this.props.prevTrack}/>
          {!this.props.isPlaying ? (
            <button type='button' className='btn btn-def player__btn fa fa-play' onClick={this.props.play}/>
          ) : (
            <button type='button' className='btn btn-def player__btn fa fa-pause' onClick={this.props.pause}/>
          )}
          <button type='button' className='btn btn-def player__btn fa fa-fast-forward' onClick={this.props.nextTrack}/>

          <AudioPlayer />

          <button type='button' className='btn btn-def player__btn fa fa-bars' onClick={this.props.toggleSidebar}/>
        </div>
      </nav>
    )
  }
}

export default BottomBar
