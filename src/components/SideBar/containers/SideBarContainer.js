import {connect} from 'react-redux';

import {doNothing, scrollLeft, scrollRight} from '../modules/sidebar';
import Sidebar from '../components/Sidebar';
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
  shuffle,
  reverse
} from '../../../modules/player'

const mapDispatchToProps = {
  doNothing,
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
  shuffle,
  reverse
};

const mapStateToProps = (state) => ({
  isOpen: !state.sidebar.isOpen,
  scrolledTabs: state.sidebar.scrolledTabs,
  plKeys: state.player.plKeys,
  plTab: state.player.plTab,
  pls: state.player.pls,
  currentPl: state.player.currentPl,
  track: state.player.track,
  popups: state.popups,
  errors: state.player.errors,
  pos: state.player.pos

});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

