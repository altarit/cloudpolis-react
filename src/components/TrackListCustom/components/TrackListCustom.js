import React from 'react'
import PropTypes from 'prop-types'

import Track from '../../Track'

export class TrackListCustom extends React.Component {
  static propTypes = {
    songs: PropTypes.arrayOf(PropTypes.object).isRequired,
    track: PropTypes.object,
    pos: PropTypes.number,
    currentTab: PropTypes.string,
    openTab: PropTypes.string,
    pl: PropTypes.string.isRequired,
    plName: PropTypes.string,
    isTrackDrag: PropTypes.string,

    updatePlaylist: PropTypes.func,
    updateAnotherPlaylist: PropTypes.func,
    dropTrack: PropTypes.func,
    dropDeleteTrack: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      overPos: 0
    }
  }

  getPlaylist = () => {
    let current = this.props.songs
    if (current) {
      let currentSrc = this.props.track && this.props.track.src
      let i = 0
      let isCurrentPl = this.props.currentTab === this.props.pl
      return current.map(track => (
        <Track
          {...track}
          key={i}
          isCurrent={isCurrentPl && !!currentSrc && this.props.pos === i && track.src === currentSrc}
          pl={this.props.pl}
          immutable={false}
          updatePlaylist={this.props.updatePlaylist}
          isDragOver={this.props.isTrackDrag && i === this.state.overPos}
          pos={i++}
        />
      ))
    } else {
      return <div>Empty</div>
    }
  }

  openInPlaylist = () => {
    this.props.updateAnotherPlaylist(this.props.plName || this.props.pl, this.props.songs)
  }

  getTrackPos(e) {
    let target = e.currentTarget
    let y = e.pageY - target.getBoundingClientRect().top + target.parentNode.parentNode.children[1].scrollTop
    return Math.floor(y / 40)
  }

  drop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('drop')
    let pos = this.getTrackPos(e)
    this.props.dropTrack(this.props.pl, pos)
  }

  dropToBasket = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('dropToBasket')
    this.props.dropDeleteTrack()
  }

  dragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let pos = this.getTrackPos(e)
    this.setState({overPos: pos})
  }

  render() {
    return (
      <div className='playmenu__contaner'>
        <div className='playmenu__list-header'>
          <b>{this.props.openTab}</b>
        </div>
        <ul className='playmenu__list'>
          {this.getPlaylist()}
          <div className='playmenu__list-space'></div>
        </ul>
        {this.props.isTrackDrag ? (
          <div className='playmenu__list-droppable'>
            <div className='playmenu__list-drop-tracks' onMouseUpCapture={this.drop} onMouseMove={this.dragOver} >
            </div>
            <div className='playmenu__list-basket' onMouseUpCapture={this.dropToBasket}>
            </div>
          </div>
        ) : null}
        <div className='playmenu__status'>
          Tracks: {this.props.songs.length}
        </div>
      </div>
    )
  }
}

export default TrackListCustom
