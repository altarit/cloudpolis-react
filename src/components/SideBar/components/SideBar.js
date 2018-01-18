import React from 'react'
import PropTypes from 'prop-types'

import './SideBar.scss'
import TrackList from '../../TrackList'
import SidebarTopMenu from './SideBarTopMenu'
import SidebarTabs from './SideBarTabs'
import SidebarBottomMenu from './SideBarBottomMenu'
import {getPlIndexByName} from '../../../modules/player/playerReducer'

export class Sidebar extends React.Component {
  static propTypes = {
    popups: PropTypes.object.isRequired,
    pls: PropTypes.arrayOf(PropTypes.object).isRequired,
    openTab: PropTypes.string.isRequired,
    currentPl: PropTypes.string.isRequired,
    scrolledTabs: PropTypes.number.isRequired,
    errors: PropTypes.object.isRequired,
    muted: PropTypes.bool.isRequired,

    scrollLeft: PropTypes.func.isRequired,
    scrollRight: PropTypes.func.isRequired,
    selectTab: PropTypes.func.isRequired,
    setVolume: PropTypes.func.isRequired,
    moveTrack: PropTypes.func.isRequired,
    toggleMute: PropTypes.func.isRequired,
    sortByTitle: PropTypes.func.isRequired,
    sortByArtist: PropTypes.func.isRequired,
    sortByDuration: PropTypes.func.isRequired,
    sortByPath: PropTypes.func.isRequired,
    shuffle: PropTypes.func.isRequired,
    reverse: PropTypes.func.isRequired,
    closeOpenPlaylist: PropTypes.func.isRequired,
    closeOtherPlaylists: PropTypes.func.isRequired,
    createPlaylist: PropTypes.func.isRequired
  }

  drop = (e) => {
    e.preventDefault()
    let track = JSON.parse(e.dataTransfer.getData('track'))
    const openTabIndex = getPlIndexByName(this.props.pls, this.props.openTab)
    let playlistLength = this.props.pls[openTabIndex].tracks.length
    if (track.immutable) {
      this.props.moveTrack(track, null, null, this.props.openTab, playlistLength)
    } else {
      let transferPlName = e.dataTransfer.getData('pl')
      let transferTrackPos = +e.dataTransfer.getData('pos')
      this.props.moveTrack(track, transferPlName, transferTrackPos, this.props.openTab, playlistLength)
    }
  }

  dragOver = (e) => {
    e.preventDefault()
  }

  render() {
    console.log(`SideBar.render`)
    const openTabIndex = getPlIndexByName(this.props.pls, this.props.openTab)
    let songs = this.props.pls[openTabIndex].tracks
    return (
      <div className='sidebar__widget'>
        <div className='playmenu'>
          <SidebarTopMenu
            muted={this.props.muted}
            toggleMute={this.props.toggleMute}
            setVolume={this.props.setVolume}
          />

          <SidebarTabs
            pls={this.props.pls}
            openTab={this.props.openTab}
            scrolledTabs={this.props.scrolledTabs}
            popups={this.props.popups}

            selectTab={this.props.selectTab}
            scrollLeft={this.props.scrollLeft}
            scrollRight={this.props.scrollRight}
          />

          <div className='playmenu__list' onDrop={this.drop} onDragOver={this.dragOver}>
            <TrackList songs={songs} pl={this.props.openTab} immutable={false} className='tracklist_mini' />
          </div>

          <div className='playmenu__status'>
            Open: <b>{this.props.openTab}</b><br />
            Playing: <b>{this.props.currentPl}</b>
          </div>

          <SidebarBottomMenu
            popups={this.props.popups}
            openTab={this.props.openTab}
            pls={this.props.pls}
            errors={this.props.errors}

            closeOpenPlaylist={this.props.closeOpenPlaylist}
            createPlaylist={this.props.createPlaylist}
            closeOtherPlaylists={this.props.closeOtherPlaylists}

            sortByTitle={this.props.sortByTitle}
            sortByArtist={this.props.sortByArtist}
            sortByDuration={this.props.sortByDuration}
            sortByPath={this.props.sortByPath}
            shuffle={this.props.shuffle}
            reverse={this.props.reverse}
          />
        </div>
      </div>
    )
  }
}

export default Sidebar
