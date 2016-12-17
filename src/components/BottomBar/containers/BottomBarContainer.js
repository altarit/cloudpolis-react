import {connect} from 'react-redux';

//import {doNothing} from '../modules/bottomBar';
import BottomBar from '../components/BottomBar';

import {toogleSidebar} from '../../../modules/barsReducer';

const mapDispatchToProps = {
  toogleSidebar: toogleSidebar
};

const mapStateToProps = (state) => ({
  isOpen: state.sidebar /*.isOpen*/ || 'qwe'
});

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar);
