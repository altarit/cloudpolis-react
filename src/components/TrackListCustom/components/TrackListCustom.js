import React from 'react'
import PropTypes from 'prop-types'

import Track from '../../Track'

export class TrackListCustom extends React.Component {
  static propTypes = {
    songs: PropTypes.arrayOf(PropTypes.object).isRequired,
    track: PropTypes.object,
    pos: PropTypes.number,
    currentTab: PropTypes.string,
    pl: PropTypes.string.isRequired,
    plName: PropTypes.string,
    isTrackDrag: PropTypes.string,

    updatePlaylist: PropTypes.func,
    updateAnotherPlaylist: PropTypes.func,
    dropTrack: PropTypes.func,
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

  dragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let pos = this.getTrackPos(e)
    this.setState({overPos: pos})
  }

  dragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('dragEnter')
  }


  dragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('dragLeave')
  }

  render() {
    return (
      <div className='playmenu__contaner'>
        <div className='playmenu__list-header'>
          <div className='d-flex'>
            <button className='btn btn-outline-secondary mr-2' onClick={this.openInPlaylist}>
              Open New Tab
            </button>
            <button className='btn btn-outline-secondary'>
              Add To Tab ...
            </button>
          </div>
        </div>
        <ul className='playmenu__list'>
          {this.getPlaylist()}
          <div className='playmenu__list-space'></div>
        </ul>
        {this.props.isTrackDrag ? (
          <div className='playmenu__list-droppable'>
            <div className='playmenu__list-drop-tracks'
                 onMouseUpCapture={this.drop} onMouseMove={this.dragOver} onDragLeave={this.dragLeave}
                 onDragEnter={this.dragEnter}>
            </div>
            <div className='playmenu__list-basket'>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default TrackListCustom
