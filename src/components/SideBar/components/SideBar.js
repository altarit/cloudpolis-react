import React from 'react'
import cn from 'classnames'

import './Sidebar.scss'
import Track from '../../Track'


export class Sidebar extends React.Component {

  getPlaylist = () => {
    let current = this.props.pls[this.props.plTab]
    if (current) {
      let currentSrc = this.props.track && (this.props.track.href || this.props.track.src)
      //console.log('currentSrc: ' + currentSrc)
      //console.log(this.props.track)
      return current.map(track => (
        <Track key={track.href} {...track} playing={currentSrc && (track.src || track.href) == currentSrc}/>
      ))
    } else {
      return <div>Empty</div>
    }
  }

  getTabs = () => {
    return this.props.plKeys.map(plName => (
      <li key={plName}
          className={this.props.plTab == plName ? "active" : ""}
          onClick={e => {this.props.selectTab(plName)}}
      ><a draggable="true">{plName}</a></li>
    ))
  }

  scrollRight = () => {
    if (this.props.plKeys.length - this.props.scrolledTabs >= 2) {
      this.props.scrollRight()
    }
  }

  scrollLeft = () => {
    if (this.props.scrolledTabs > 0) {
      this.props.scrollLeft()
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
              <div className="playmenu__tabs-left">
                <button className="btn btn-primary fa fa-chevron-left playmenu__tabs-control"
                        onClick={this.scrollLeft}></button>
              </div>

              <div className="playmenu__tabs-center">
                <ul className="nav nav-tabs playmenu__tabs-list" style={{marginLeft: -this.props.scrolledTabs * 72}}>
                  {this.getTabs()}
                </ul>
              </div>

              <div className="playmenu__tabs-right dropdown open">
                <button type="button" className="btn fa btn-primary fa-chevron-right playmenu__tabs-control"
                        onClick={this.scrollRight}></button>
                <button type="button" className="btn btn-primary fa fa-list playmenu__tabs-control"
                        data-click="dropdown" data-for="allPlaylists"></button>
                {this.props.popups.allPlaylists ? (
                  <ul className="dropdown-menu">
                    {this.getTabs()}
                  </ul>) : ''}
              </div>
            </div>

            <div className="playmenu__list dropdown open">
              {this.props.popups.trackAdd ? (
                <ul className="dropdown-menu" style={{top: this.props.popups.trackAdd.y - 50}}>
                  <li><a className="fa fa-plus"> Add into the end of {this.props.currentPl}</a></li>
                  <li><a className="fa fa-plus"> Remove from {this.props.plTab}</a></li>
                  <li><a className="fa fa-plus"> Go to the artist</a></li>
                  <li><a className="fa fa-plus"> Download</a></li>
                  <li><a className="fa fa-plus"> Open link in a new tab</a></li>
                </ul>) : ''}
              <ul className="tracklist_mini">
                {this.getPlaylist()}
              </ul>
            </div>

            <div className="playmenu__status">
              Is being played: <b>{this.props.currentPl}</b>
            </div>

            <div className="playmenu__bottom dropdown open">
              <button type="button" className="btn btn-primary fa fa-plus"
                      data-click="dropdown" data-for="bottomAdd"/>
              <button type="button" className="btn btn-primary fa fa-minus"
                      data-click="dropdown" data-for="bottomRemove"/>
              <button type="button" className="btn btn-primary fa fa-sort"
                      data-click="dropdown" data-for="bottomSort"/>
              <button type="button" className="btn btn-primary fa fa-list"
                      data-click="dropdown" data-for="bottomPls"/>

              {this.props.popups.bottomAdd ? (
                <ul className="dropdown-menu">
                  <li><a className="fa fa-plus"> From current page to "{this.props.plTab}"</a></li>
                  <li><a className="fa fa-plus"> From another playlist</a></li>
                  <li><a className="fa fa-plus"> Close other</a></li>
                </ul>) : ''}

              {this.props.popups.bottomRemove ? (
                <ul className="dropdown-menu">
                  <li><a className="fa fa-minus"> Remove current track from playlist</a></li>
                  <li><a className="fa fa-minus"> Remove all in "{this.props.plTab}"</a></li>
                  <li><a className="fa fa-minus"> Remove selected tracks</a></li>
                </ul>) : ''}

              {this.props.popups.bottomSort ? (
                <ul className="dropdown-menu">
                  <li><a className="fa fa-sort"> Sort by title</a></li>
                  <li><a className="fa fa-sort"> Sort by artist</a></li>
                  <li><a className="fa fa-sort"> Sort by duration</a></li>
                  <li><a className="fa fa-sort"> Shuffle</a></li>
                  <li><a className="fa fa-sort"> Reverse</a></li>
                </ul>) : ''}

              {this.props.popups.bottomPls ? (
                <ul className="dropdown-menu">
                  <li><a className="fa fa-file-o"> New playlist</a></li>
                  <li><a className="fa fa-times"> Close playlist</a></li>
                  <li><a className="fa fa-times"> Close other</a></li>
                </ul>) : ''}
            </div>

          </div>
        </div>
      </div>
    );
  }
}


export default Sidebar;
