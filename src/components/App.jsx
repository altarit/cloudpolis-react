import React from 'react';
import {connect} from 'react-redux';

import BottomBar from './BottomBar';
import SideBar from './SideBar';
import Container from './Container';
import * as actionCreators from '../store/action_creators';


class App extends React.Component {

  isSidebarOpened() {
    //this.props.sidebar.toogled
    return true;
  }

  render() {
    return <div>
      <BottomBar {...this.props}/>
      <Container {...this.props} />
      <SideBar {...this.props.sidebar}/>
    </div>
  }
}

function mapStateToProps(state) {
  console.log("state: " + state);
  return state.toJS();
}

export default connect(mapStateToProps, actionCreators)(App);
//export default connect(null, actionCreators)(App);
