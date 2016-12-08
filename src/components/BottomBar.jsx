import React from 'react';



class BottomBar extends React.Component {

  render() {
    return <nav className="navbar navbar-inverse navbar-fixed-bottom">
      <div className="container">
        <div className="navbar-header">
          <button className="navbar-toggle collapsed"
                  onClick={this.props.toogleSidebar} >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">BottomBar</a>
        </div>
      </div>
    </nav>
  }
}





export default BottomBar;
