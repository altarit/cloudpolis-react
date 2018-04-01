import React from 'react'
import PropTypes from 'prop-types'

import Track from '../../Track'

export class TrackListCustom extends React.Component {
  static propTypes = {
    track: PropTypes.object,
    pos: PropTypes.number,
    currentTab: PropTypes.string,
    openTab: PropTypes.string,
    plName: PropTypes.string,
    isTrackDrag: PropTypes.bool,
    filters: PropTypes.array.isRequired,

    updatePlaylist: PropTypes.func,
    updateAnotherPlaylist: PropTypes.func,
    dropTrack: PropTypes.func,
    dropDeleteTrack: PropTypes.func.isRequired,
    getRandomTracks: PropTypes.func.isRequired,
    cutObsoleteTracks: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      overPos: 0
    }
  }

  getPlaylist = () => {
    let current = this.props.playlist.tracks
    if (current) {
      let currentSrc = this.props.track && this.props.track.src
      let i = 0
      let isCurrentPl = this.props.currentTab === this.props.playlist.name
      let result = []
      for (let i = 0; i < current.length; i++) {
        if (this.props.playlist.type === 'R' && i >= 10) {
          break
        }
        let track = current[i]
        result.push(
          <Track
            {...track}
            key={i}
            isCurrent={isCurrentPl && !!currentSrc && this.props.pos === i && track.src === currentSrc}
            pl={this.props.playlist.name}
            immutable={false}
            updatePlaylist={this.props.updatePlaylist}
            isDragOver={this.props.isTrackDrag && i === this.state.overPos}
            pos={i}
          />
        )
      }
      if (this.props.playlist.type === 'R') {
        result.push(<div>Playlist will be updated automatically</div>)
      }
      return result
    } else {
      return <div>Empty</div>
    }
  }

  componentDidUpdate() {
    if (this.props.playlist.type === 'R') {
      this.componentDidUpdateRandom()
    }
  }

  componentDidUpdateRandom = () => {
    if (this.props.playlist.name !== this.props.currentTab) {
      return
    }

    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    this.timer = setTimeout(this.automaticallyUpdate.bind(this), 100)
  }

  automaticallyUpdate() {
    let len = this.props.playlist.tracks.length
    let plName = this.props.playlist.name

    if (this.props.pos >= 5 && len > 10) {
      this.props.cutObsoleteTracks(plName, 1)
    }

    if (len < 20) {
      if (Date.now() - this.props.playlist.lastUpdate > 1000) {
        this.props.getRandomTracks(this.props.playlist.name, this.props.playlist.filter.value, false)
      }
    }
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
    this.props.dropTrack(this.props.playlist.name, pos)
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

  refreshRandom = () => {
    this.props.getRandomTracks(this.props.playlist.name, this.props.playlist.filter.value, true)
  }

  selectFilter = (filter) => {
    this.props.selectFilter(filter, this.props.playlist.name)
    this.props.getRandomTracks(this.props.playlist.name, filter.value, true)
  }

  render() {
    return (
      <div className='playmenu__contaner'>
        <div className='playmenu__list-header'>

          {this.props.playlist.type === 'R' ? (
            <div className='playmenu__list-header_control'>
              <b className='playmenu__list-header_title'>{this.props.playlist.filter.name}</b>
              <button type='button' className='btn btn-sm btn-outline-secondary btn-margin-small-around'
                      data-click='dropdown' data-for='allFilters'>
                Filter
              </button>
              <button type='button' className='btn btn-sm btn-outline-secondary btn-margin-small-around'
                      onClick={this.refreshRandom}>
                Refresh all
              </button>
              <div className='dropdown'>
                {this.props.allFiltersPopup ? (
                  <ul className='dropdown-menu show'>
                    {this.props.filters.map(filter => (
                      <li key={filter.name} onClick={(e) => this.selectFilter(filter)}>{filter.name}</li>
                    ))}
                  </ul>) : ''}
              </div>
            </div>
          ) : (
            <b className='playmenu__list-header_title'>{this.props.openTab}</b>
          )}


        </div>
        <ul className='playmenu__list'>
          {this.getPlaylist()}
          <div className='playmenu__list-space'></div>
        </ul>
        {this.props.isTrackDrag ? (
          <div className='playmenu__list-droppable'>
            <div className='playmenu__list-drop-tracks' onMouseUpCapture={this.drop} onMouseMove={this.dragOver}>
            </div>
            <div className='playmenu__list-basket' onMouseUpCapture={this.dropToBasket}>
            </div>
          </div>
        ) : null}
        <div className='playmenu__status'>
          Tracks: {this.props.playlist.tracks.length}
        </div>
      </div>
    )
  }
}

export default TrackListCustom
