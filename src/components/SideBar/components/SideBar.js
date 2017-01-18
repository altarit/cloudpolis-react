import React from 'react'
import cn from 'classnames'

import './Sidebar.scss'
import Track from '../../Track'
import OpenPlaylistDialog from '../../OpenPlaylistDialog'


export class Sidebar extends React.Component {

  getPlaylist = () => {
    let current = this.props.pls[this.props.plTab]
    if (current) {
      let currentSrc = this.props.track && (this.props.track.href || this.props.track.src)
      //console.log('currentSrc: ' + currentSrc)
      //console.log(this.props.track)
      let i = 0
      return current.map(track => (
        <Track key={i}
          {...track}
               playing={currentSrc && this.props.pos === i && (track.src || track.href) == currentSrc && (this.props.currentPl == this.props.plTab)}
               pl={this.props.plTab}
               pos={i++}
               mutable={true}
        />
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

  volumeChanged = (e) => {
    this.props.setVolume(e.target.value / 20)
  }

  drop = (e) => {
    e.preventDefault()
    let track = JSON.parse(e.dataTransfer.getData('track'))
    if (track.immutable) {
      this.props.moveTrack(track, null, null, this.props.plTab, this.props.pls[this.props.plTab].length)
    } else {
      this.props.moveTrack(track, e.dataTransfer.getData('pl'), e.dataTransfer.getData('pos'), this.props.plTab, this.props.pls[this.props.plTab].length)
    }
  }

  dragOver = (e) => {
    e.preventDefault()
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
              <div className="playmenu__volume">
                <button type="button" className="btn btn-info fa fa-volume-up" onClick={this.props.mute}/>
                <input type="range" className="playmenu__volume-slider"
                       min="1" max="20" defaultValue="20" onChange={this.volumeChanged}/>
              </div>
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

            <div className="playmenu__list" onDrop={this.drop} onDragOver={this.dragOver}>
              <ul className="tracklist_mini">
                {this.getPlaylist()}
              </ul>
            </div>

            <div className="playmenu__status">
              Open: <b>{this.props.plTab}</b><br/>
              Playing: <b>{this.props.currentPl}</b>
            </div>

            <div className="playmenu__bottom dropdown open">
              <button type="button" className="btn btn-primary fa fa-check"
                      data-click="dropdown" data-for="bottomAdd">
              </button>
              <button type="button" className="btn btn-primary fa fa-plus"
                      data-click="dropdown" data-for="bottomAdd"> Add
              </button>
              <button type="button" className="btn btn-primary fa fa-minus"
                      data-click="dropdown" data-for="bottomRemove"> Rem
              </button>
              <button type="button" className="btn btn-primary fa fa-sort"
                      data-click="dropdown" data-for="bottomSort"> Sort
              </button>
              <button type="button" className="btn btn-primary fa fa-ellipsis-h"
                      data-click="dropdown" data-for="bottomPls"> Playlist
              </button>

              {this.props.popups.bottomAdd ? (
                <ul className="dropdown-menu dropdown_fixed"
                    style={{bottom: this.props.popups.bottomAdd.ry + 20, left: this.props.popups.bottomAdd.x - 125}}>
                  <li><a className="fa fa-plus"> From current page to "{this.props.plTab}"</a></li>
                  <li><a className="fa fa-plus"> From another playlist</a></li>
                  <li><a className="fa fa-plus"> Close other</a></li>
                </ul>) : ''}

              {this.props.popups.bottomRemove ? (
                <ul className="dropdown-menu dropdown_fixed"
                    style={{bottom: this.props.popups.bottomRemove.ry + 20, left: this.props.popups.bottomRemove.x - 175}}>
                  <li><a className="fa fa-minus"> Remove current track from playlist</a></li>
                  <li><a className="fa fa-minus"> Remove all in "{this.props.plTab}"</a></li>
                  <li><a className="fa fa-minus"> Remove selected tracks</a></li>
                </ul>) : ''}

              {this.props.popups.bottomSort ? (
                <ul className="dropdown-menu dropdown_fixed"
                    style={{bottom: this.props.popups.bottomSort.ry + 20, left: this.props.popups.bottomSort.x - 175}}>
                  <li><a className="fa fa-sort" onClick={this.props.sortByTitle}> Sort by title</a></li>
                  <li><a className="fa fa-sort" onClick={this.props.sortByArtist}> Sort by artist</a></li>
                  <li><a className="fa fa-sort" onClick={this.props.sortByDuration}> Sort by duration</a></li>
                  <li><a className="fa fa-sort" onClick={this.props.sortByPath}> Sort by path</a></li>
                  <li><a className="fa fa-sort" onClick={this.props.shuffle}> Shuffle</a></li>
                  <li><a className="fa fa-sort" onClick={this.props.reverse}> Reverse</a></li>
                </ul>) : ''}

              {this.props.popups.bottomPls ? (
                <ul className="dropdown-menu dropdown_fixed"
                    style={{bottom: this.props.popups.bottomPls.ry + 20, left: this.props.popups.bottomPls.x - 175}}>
                  <li>
                    <a className="fa fa-file-o" data-click="dropdown" data-for="playlistCreation"> New playlist</a>
                  </li>
                  <li><a className="fa fa-times" onClick={this.props.closeOpenPlaylist}> Close playlist</a></li>
                  <li><a className="fa fa-angle-double-down" onClick={this.props.closeOtherPlaylists}> Close others</a>
                  </li>
                  <li>
                    <a className="fa fa-folder-open-o" data-click="dropdown" data-for="openPlaylistDialog"> Open
                      playlist</a>
                  </li>
                  <li>
                    <a className="fa fa-floppy-o" data-click="dropdown" data-for="savePlaylistDialog"> Save playlist</a>
                  </li>
                </ul>) : ''}

              {this.props.popups.playlistCreation ? (
                <div className="dropdown-menu" data-click="none">
                  <form
                    onSubmit={(e) => {e.preventDefault(); this.props.createPlaylist(this.refs.menuPlCreationInput.value)}}>
                    <div className="form-group">
                      <label htmlFor="artists-filter">Playlist name</label>
                      <input type="text" className="form-control" ref="menuPlCreationInput"/>
                      <span>{this.props.errors.createPlaylist}</span>
                    </div>
                    <div className="btn-group">
                      <button type="submit" className="btn btn-primary">Create</button>
                    </div>
                    <div className="btn-group">
                      <button type="button" className="btn btn-primary" data-click="closeall">Cancel</button>
                    </div>
                  </form>
                </div>) : null
              }

              {this.props.popups.openPlaylistDialog ? (
                <OpenPlaylistDialog playlist={this.props.pls[this.props.plTab]}/>
              ) : null }

              {this.props.popups.savePlaylistDialog ? (
                <OpenPlaylistDialog playlist={this.props.pls[this.props.plTab]} forSave="true"
                                    filename={this.props.plTab}/>
              ) : null }
            </div>

          </div>
        </div>
      </div>
    );
  }
}


export default Sidebar;
