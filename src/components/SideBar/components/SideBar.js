import React from 'react';
import './SideBar.scss';

var cn = require('classnames');

export class SideBar extends React.Component {
  render() {
    let classes = cn({
      "sidebar": true,
      "sidebar_open": this.props.isOpen
    });


    return (
      <div className={classes}>
        <div className="sidebar__widget">
          <div className="playmenu">

            <div className="playmenu__top">
              <button type="button" className="btn btn-info fa fa-fast-backward"/>
              <button type="button" className="btn btn-info fa fa-fast-forward"/>
              <button type="button" className="btn btn-info fa fa-retweet"/>
              <button type="button" className="btn btn-info fa fa-random"/>
              <button type="button" className="btn btn-info fa fa-volume-up"/>
            </div>

            <div className="playmenu__tabs">
              <ul className="nav nav-tabs">
                <li className="active"><a href="#home">Stored</a></li>
                <li><a href="#profile">Current</a></li>
                <li><a href="#messages">Random</a></li>
                <li><a href="#settings">History</a></li>
              </ul>
            </div>

            <div className="playmenu__list">
            </div>

            <div className="playmenu__status">
            </div>

            <div className="playmenu__bottom">
              <button type="button" className="btn btn-info fa fa-fast-backward"/>
              <button type="button" className="btn btn-info fa fa-fast-forward"/>
              <button type="button" className="btn btn-info fa fa-retweet"/>
              <button type="button" className="btn btn-info fa fa-random"/>
              <button type="button" className="btn btn-info fa fa-volume-up"/>
            </div>

          </div>
        </div>
      </div>
    );
  }
}


export default SideBar;
