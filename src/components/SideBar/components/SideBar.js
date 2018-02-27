import React from 'react'
import PropTypes from 'prop-types'

import './SideBar.scss'
import TrackListCustom from '../../TrackListCustom'
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
    createPlaylist: PropTypes.func.isRequired,
    renamePlaylist: PropTypes.func.isRequired,
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
            closePlaylist={this.props.closePlaylist}
            createPlaylist={this.props.createPlaylist}
          />

          <TrackListCustom songs={songs} pl={this.props.openTab} />

          <SidebarBottomMenu
            popups={this.props.popups}
            openTab={this.props.openTab}
            tabs={this.props.tabs}
            errors={this.props.errors}

            closePlaylist={this.props.closePlaylist}
            createPlaylist={this.props.createPlaylist}
            renamePlaylist={this.props.renamePlaylist}
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
