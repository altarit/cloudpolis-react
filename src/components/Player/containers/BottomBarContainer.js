import {connect} from 'react-redux';

//import {doNothing} from '../modules/bottomBar';
import BottomBar from '../components/BottomBar';

import {toggleSidebar} from '../../../components/Sidebar/modules/sidebar';
import {play, pause, nextTrack, prevTrack, endTrack} from '../../../modules/player';

const mapDispatchToProps = {
  toggleSidebar,
  play,
  pause,
  nextTrack,
  prevTrack,
  endTrack
};

const mapStateToProps = (state) => ({
  track: state.player.track,
  isPlayed: state.player.isPlayed,
  volume: state.player.volume,
  muted: state.player.muted
});

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar);
