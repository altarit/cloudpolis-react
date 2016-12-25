import {connect} from 'react-redux';

//import {doNothing} from '../modules/bottomBar';
import BottomBar from '../components/BottomBar';

import {toogleSidebar} from '../../../modules/barsReducer';
import {play, pause} from '../modules/bottomBar';

const mapDispatchToProps = {
  toogleSidebar: toogleSidebar,
  play: play,
  pause: pause
};

const mapStateToProps = (state) => ({
  track: state.player.track,
  isPlayed: state.player.isPlayed
});

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar);