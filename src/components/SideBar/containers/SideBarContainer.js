import {connect} from 'react-redux'

import Sidebar from '../components/SideBar'
import {selectTab,
  createPlaylist,
  renamePlaylist,
  closePlaylist,
  closeOthersPlaylists,
  setVolume,
  toggleMute,
  toogleRepeat,
  moveTrack,
  sortByTitle,
  sortByArtist,
  sortByDuration,
  sortByPath,
  shuffle,
  reverse,
  scrollLeft,
  scrollRight
} from '../../../modules/player/playerActions'

const mapDispatchToProps = {
  selectTab,
  scrollLeft,
  scrollRight,
  createPlaylist,
  renamePlaylist,
  closePlaylist,
  closeOthersPlaylists,
  setVolume,
  toggleMute,
  toogleRepeat,
  moveTrack,
  sortByTitle,
  sortByArtist,
  sortByDuration,
  sortByPath,
  shuffle,
  reverse
}

const mapStateToProps = (state) => ({
  scrolledTabs: state.player.scrolledTabs,
  openTab: state.player.openTab,
  tabs: state.player.tabs,
  currentTab: state.player.currentTab,
  track: state.player.track,
  popups: state.popups,
  errors: state.player.errors,
  pos: state.player.pos,
  muted: state.player.muted,
  repeated: state.player.repeated,
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
