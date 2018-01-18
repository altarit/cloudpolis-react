import {connect} from 'react-redux'

import Sidebar from '../components/SideBar'
import {selectTab,
  createPlaylist,
  closeOpenPlaylist,
  closeOtherPlaylists,
  setVolume,
  toggleMute,
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
  closeOpenPlaylist,
  closeOtherPlaylists,
  setVolume,
  toggleMute,
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
  pls: state.player.pls,
  currentPl: state.player.currentPl,
  track: state.player.track,
  popups: state.popups,
  errors: state.player.errors,
  pos: state.player.pos,
  muted: state.player.muted
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
