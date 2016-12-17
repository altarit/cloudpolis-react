import {connect} from 'react-redux';

import {doNothing} from '../modules/sideBar';
import SideBar from '../components/SideBar';

const mapDispatchToProps = {
  doNothing: doNothing
};

const mapStateToProps = (state) => ({
  //isOpen: state.sidebar /*.isOpen*/ || 'qwe'
  isOpen: state.bars
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

