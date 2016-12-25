import {connect} from 'react-redux';

import {doNothing} from '../modules/sideBar';
import SideBar from '../components/SideBar';
import {selectTab} from '../../../modules/player'

const mapDispatchToProps = {
  doNothing: doNothing,
  selectTab
};

const mapStateToProps = (state) => ({
  //isOpen: state.sidebar /*.isOpen*/ || 'qwe'
  isOpen: state.bars,
  plKeys: state.player.plKeys,
  plTab: state.player.plTab,
  pls: state.player.pls
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

