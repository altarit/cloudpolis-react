import React from 'react';
import './SideBar.scss';

var cn = require('classnames');

export class SideBar extends React.Component {
  render() {
    let classes = cn({
      "sidebar": true,
      "sidebar_open": this.props.isOpen
    });

    return <div className={classes}>
      <div className="side-player"
           onClick={(e) => {this.props.doNothing('zzz')} }>
        SideBar {this.props.isOpen} !
      </div>
    </div>

  }
}


export default SideBar;
