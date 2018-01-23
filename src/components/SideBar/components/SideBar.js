import React from 'react'
import PropTypes from 'prop-types'

import './SideBar.scss'
import TrackList from '../../TrackList'
import SidebarTopMenu from './SideBarTopMenu'
import SidebarTabs from './SideBarTabs'
import SidebarBottomMenu from './SideBarBottomMenu'
import {getTabIndexByName} from '../../../modules/player/playerReducer'

export class Sidebar extends React.Component {
  static propTypes = {
    popups: PropTypes.object.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
    openTab: PropTypes.string.isRequired,
    currentTab: PropTypes.string.isRequired,
    scrolledTabs: PropTypes.number.isRequired,
    errors: PropTypes.object.isRequired,
    muted: PropTypes.bool.isRequired,
    repeated: PropTypes.bool.isRequired,

    scrollLeft: PropTypes.func.isRequired,
    scrollRight: PropTypes.func.isRequired,
    selectTab: PropTypes.func.isRequired,
    setVolume: PropTypes.func.isRequired,
    moveTrack: PropTypes.func.isRequired,
    toggleMute: PropTypes.func.isRequired,
    toogleRepeat: PropTypes.func.isRequired,
    sortByTitle: PropTypes.func.isRequired,
    sortByArtist: PropTypes.func.isRequired,
    sortByDuration: PropTypes.func.isRequired,
    sortByPath: PropTypes.func.isRequired,
    shuffle: PropTypes.func.isRequired,
    reverse: PropTypes.func.isRequired,
    closePlaylist: PropTypes.func.isRequired,
    closeOthersPlaylists: PropTypes.func.isRequired,
    createPlaylist: PropTypes.func.isRequired
  }

  drop = (e) => {
    e.preventDefault()
    let track = JSON.parse(e.dataTransfer.getData('track'))
    const openTabIndex = getTabIndexByName(this.props.tabs, this.props.openTab)
    let playlistLength = this.props.tabs[openTabIndex].tracks.length
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
    const openTabIndex = getTabIndexByName(this.props.tabs, this.props.openTab)
    let songs = this.props.tabs[openTabIndex].tracks
    return (
      <div className='sidebar__widget'>
        <div className='playmenu'>
          <SidebarTopMenu
            muted={this.props.muted}
            repeated={this.props.repeated}
            toggleMute={this.props.toggleMute}
            toogleRepeat={this.props.toogleRepeat}
            setVolume={this.props.setVolume}
          />

          <SidebarTabs
            tabs={this.props.tabs}
            openTab={this.props.openTab}
            currentTab={this.props.currentTab}
            scrolledTabs={this.props.scrolledTabs}
            popups={this.props.popups}

            selectTab={this.props.selectTab}
            scrollLeft={this.props.scrollLeft}
            scrollRight={this.props.scrollRight}
            closeOpenPlaylist={this.props.closeOpenPlaylist}
          />

          <div className='playmenu__list' onDrop={this.drop} onDragOver={this.dragOver}>
            <TrackList songs={songs} pl={this.props.openTab} immutable={false} className='tracklist_mini' />
          </div>

          <div className='playmenu__status'>
            Open: <b>{this.props.openTab}</b><br />
            Playing: <b>{this.props.currentTab}</b>
          </div>

          <SidebarBottomMenu
            popups={this.props.popups}
            openTab={this.props.openTab}
            tabs={this.props.tabs}
            errors={this.props.errors}

            closePlaylist={this.props.closePlaylist}
            createPlaylist={this.props.createPlaylist}
            closeOthersPlaylists={this.props.closeOthersPlaylists}

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
