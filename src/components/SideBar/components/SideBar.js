import React from 'react'
import cn from 'classnames'

import './SideBar.scss'
import Track from '../../Track'


export class SideBar extends React.Component {

  getPlaylist = () => {
    let current = this.props.pls[this.props.plTab]
    if (current) {
      return current.map(track => (
        <Track key={track.href} {...track} />
      ))
    } else {
      return <div>Empty</div>
    }
  }

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
                {this.props.plKeys.map(plName => (
                  <li key={plName}
                      className={this.props.plTab == plName ? "active" : ""}
                      onClick={e => {this.props.selectTab(plName)}}
                  ><a href="#">{plName}</a></li>
                ))}
              </ul>
            </div>

            <div className="playmenu__list">
              <ul className="tracklist_mini">
                {this.getPlaylist()}
              </ul>
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
