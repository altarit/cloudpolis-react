import React from 'react';
import './BottomBar.scss';


class BottomBar extends React.Component {

  render() {


    return (<nav className="navbar navbar-inverse navbar-fixed-bottom">
      <div className="container">
        <div className="navbar-header">

          <a className="navbar-brand" href="#">Home</a>
          <a className="navbar-brand" href="#">Music</a>
          <a className="navbar-brand" href="#">Posts</a>
          <a className="navbar-brand" href="#">Search</a>
        </div>
        <button className="navbar-toggle collapsed"
                onClick={this.props.toogleSidebar} >
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>


      </div>
    </nav>);
  }
}


export default BottomBar;
