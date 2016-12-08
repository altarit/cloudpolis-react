import React from 'react';

import BottomBar from './BottomBar';
import SideBar from './SideBar';
import Container from './Container';

class App extends React.Component {

  isSidebarOpened() {
    //this.props.sidebar.toogled
    return true;
  }

  toogleSidebar() {
    console.log('toogled');
  }

  render() {
    return <div>
      <Container {...this.props} />
      <SideBar opened={this.isSidebarOpened}/>
      <BottomBar toogleSidebar={this.toogleSidebar}/>
    </div>
  }
}


export default App;
