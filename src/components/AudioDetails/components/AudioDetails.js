import React from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable'
import {Link} from 'react-router-dom'

import Input from '../../Input'

import './AudioDetails.scss'
import {requestLyrics, updateLyrics} from "../modules/audioDetails"

export class AudioDetails extends React.Component {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    mobile: PropTypes.bool.isRequired,
    isInfoEditMode: PropTypes.bool.isRequired,
    isLirycsEditMode: PropTypes.bool.isRequired,
    sidebar: PropTypes.bool.isRequired,
    track: PropTypes.object.isRequired,
    lyrics: PropTypes.string.isRequired,

    enableInfoEditMode: PropTypes.func.isRequired,
    enableLyricsEditMode: PropTypes.func.isRequired,
    disableEditMode: PropTypes.func.isRequired,
    toggleAudioDetails: PropTypes.func.isRequired,
    nextTrack: PropTypes.func.isRequired,
    prevTrack: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    updateLyrics: PropTypes.func.isRequired,
  }

  eventLogger = (e, data) => {
    console.log('Event: ', e)
    console.log('Data: ', data)
  }

  onStart = () => {
    //this.setState({activeDrags: ++this.state.activeDrags});
  }

  onStop = () => {
    //this.setState({activeDrags: --this.state.activeDrags});
  }

  onDrag = () => {
    //this.setState({activeDrags: --this.state.activeDrags});
  }

  changeFilter = (newValue) => {
    this.props.getTracksByQuery(newValue)
  }

  renderEditMode = () => {
    return (
      <div>
        <div>
          Title: <Input onChange={this.changeFilter} delay={300}/>
        </div>
        <div>
          Artist:
        </div>
        <div>
          Album:
        </div>
        <div>
          Compilation:
        </div>
      </div>
    )
  }

  copyTrackLink = () => {

  }

  enableEditMode = () => {

  }

  disableEditMode = () => {

  }


  saveTrackInfo = () => {
    let text = this.refs.detailsLyrics.value
    console.log(text)
    this.props.updateLyrics(this.props.track.id, text)
  }

  renderViewMode = (editMode) => {
    return (
      <div className='audio-details-info_main'>
        <div>
          {/*<button onClick={this.copyTrackLink}>Copy link</button>*/}
          {!this.props.isInfoEditMode && !this.props.isLirycsEditMode ? (
            <label>{/*<button onClick={this.props.enableInfoEditMode}>Edit Tags</button>*/}</label>
          ) : (
            <button onClick={this.props.disableEditMode}>Cancel</button>
          )}
          {!this.props.isInfoEditMode && !this.props.isLirycsEditMode ? (
            <button onClick={this.props.enableLyricsEditMode}>Edit Lirycs</button>
          ) : (
            <button onClick={this.saveTrackInfo}>Save</button>
          )}


        </div>
        <div className='audio-details-info_row'>
          <label className='audio-details-info_label'>Title:</label>
          <div className='audio-details-info_content'>
            {this.props.track.title}
          </div>
        </div>
        <div className='audio-details-info_row'>
          <label className='audio-details-info_label'>
            Artist:
          </label>
          <div className='audio-details-info_content'>
            {this.props.track.artist}
          </div>
        </div>
        <div className='audio-details-info_row'>
          <label className='audio-details-info_label'>
            Album:
          </label>
          <div className='audio-details-info_content'>
            {this.props.track.album}
          </div>
        </div>
        <div className='audio-details-info_row'>
          <label className='audio-details-info_label'>Location:</label>
          <div className='audio-details-info_content'>
            <Link to={`/music/libraries/${this.props.track.library}/${this.props.track.compilation}`}>
              {this.props.track.compilation ? `/${this.props.track.library}/${this.props.track.compilation}` : null}
            </Link>
          </div>
        </div>
      </div>
    )
  }


  render() {
    return (
      <Draggable
        handle='.handle'
        defaultPosition={{x: 50, y: -450}}
        position={null}
        onStart={this.onStart}
        onDrag={this.onDrag}
        onStop={this.onStart}>
        {!this.props.isDetailsOpen ? (
          <div className='audio-details-popup dropdown dropdown-menu show'>
            <div className='audio-details-header'>
              <div className='handle audio-details-draggable'>Now playing...</div>
              <div className='handle audio-details-close' onClick={this.props.toggleAudioDetails}>
                <i className=' fa fa-fw fa-times'></i>
              </div>
            </div>
            <div className='audio-details-info'>
              {this.renderViewMode(this.props.isInfoEditMode)}
              <div className='audio-details-info_cover'></div>
            </div>
            <div className='audio-details_lyrics'>
              <div>Lyrics:</div>
              <div className='audio-details_lyrics-text'>
              {this.props.isLirycsEditMode ? (
                <textarea defaultValue={this.props.lyrics} ref='detailsLyrics'></textarea>
              ) : this.props.lyrics !== '<none>' ? (
                <pre style={{height: '180px'}}>{this.props.lyrics}</pre>
              ) : 'Loading'}
              </div>
            </div>
          </div>
        ) : (<div></div>)}
      </Draggable>
    )
  }
}

export default AudioDetails
