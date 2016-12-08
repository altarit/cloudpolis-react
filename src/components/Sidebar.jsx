import React from 'react';
var cn = require('classnames');

class SideBar extends React.Component {
  render() {
    let classes = cn({
      "sidebar": true,
      "sidebar_opened": this.props.opened
    });

    return <div className={classes}>
      <div className="side-player">
        SideBar
      </div>
    </div>

  }
}


export default SideBar;
