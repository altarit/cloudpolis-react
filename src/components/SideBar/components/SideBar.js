import React, {PropTypes} from 'react'
import cn from 'classnames'

import './Sidebar.scss'
import TrackList from '../../TrackList'
import OpenPlaylistDialog from '../../OpenPlaylistDialog'

export class Sidebar extends React.Component {

  static propTypes = {
    isOpen: PropTypes.bool,
    popups: PropTypes.object.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
    pls: PropTypes.object.isRequired,
    openTab: PropTypes.string.isRequired,
    currentPl: PropTypes.string.isRequired,
    scrolledTabs: PropTypes.number.isRequired,
    errors: PropTypes.object.isRequired,
    muted: PropTypes.bool.isRequired,

    scrollLeft: PropTypes.func.isRequired,
    scrollRight: PropTypes.func.isRequired,
    selectTab: PropTypes.func.isRequired,
    setVolume: PropTypes.func.isRequired,
    moveTrack: PropTypes.func.isRequired,
    toggleMute: PropTypes.func.isRequired,
    sortByTitle: PropTypes.func.isRequired,
    sortByArtist: PropTypes.func.isRequired,
    sortByDuration: PropTypes.func.isRequired,
    sortByPath: PropTypes.func.isRequired,
    shuffle: PropTypes.func.isRequired,
    reverse: PropTypes.func.isRequired,
    closeOpenPlaylist: PropTypes.func.isRequired,
    closeOtherPlaylists: PropTypes.func.isRequired,
    createPlaylist: PropTypes.func.isRequired
  }

  getTabs = () => {
    return this.props.tabs.map(plName => (
      <li key={plName}
        className={this.props.openTab === plName ? 'active' : ''}
        onClick={e => { this.props.selectTab(plName) }}
      ><a draggable='true'>{plName}</a></li>
    ))
  }

  renderBottomAddPopup = () => {
    return this.props.popups.bottomAdd ? (
      <ul className='dropdown-menu dropdown_fixed'
        style={{bottom: this.props.popups.bottomAdd.ry + 20, left: this.props.popups.bottomAdd.x - 125}}>
        <li><a className='fa fa-plus'> From current page to "{this.props.openTab}"</a></li>
        <li><a className='fa fa-plus'> From another playlist</a></li>
        <li><a className='fa fa-plus'> Close other</a></li>
      </ul>) : null
  }

  renderBottomRemovePopup = () => {
    return this.props.popups.bottomRemove ? (
      <ul className='dropdown-menu dropdown_fixed'
        style={{
          bottom: this.props.popups.bottomRemove.ry + 20,
          left: this.props.popups.bottomRemove.x - 175
        }}>
        <li><a className='fa fa-minus'> Remove current track from playlist</a></li>
        <li><a className='fa fa-minus'> Remove all in "{this.props.openTab}"</a></li>
        <li><a className='fa fa-minus'> Remove selected tracks</a></li>
      </ul>) : null
  }

  renderBottomSortPopup = () => {
    return this.props.popups.bottomSort ? (
      <ul className='dropdown-menu dropdown_fixed'
        style={{bottom: this.props.popups.bottomSort.ry + 20, left: this.props.popups.bottomSort.x - 175}}>
        <li><a className='fa fa-sort' onClick={this.props.sortByTitle}> Sort by title</a></li>
        <li><a className='fa fa-sort' onClick={this.props.sortByArtist}> Sort by artist</a></li>
        <li><a className='fa fa-sort' onClick={this.props.sortByDuration}> Sort by duration</a></li>
        <li><a className='fa fa-sort' onClick={this.props.sortByPath}> Sort by path</a></li>
        <li><a className='fa fa-sort' onClick={this.props.shuffle}> Shuffle</a></li>
        <li><a className='fa fa-sort' onClick={this.props.reverse}> Reverse</a></li>
      </ul>) : null
  }

  renderBottomPlaylistPopup = () => {
    return this.props.popups.bottomPls ? (
      <ul className='dropdown-menu dropdown_fixed'
        style={{bottom: this.props.popups.bottomPls.ry + 20, left: this.props.popups.bottomPls.x - 175}}>
        <li>
          <a className='fa fa-file-o' data-click='dropdown' data-for='playlistCreation'> New playlist</a>
        </li>
        <li><a className='fa fa-times' onClick={this.props.closeOpenPlaylist}> Close playlist</a></li>
        <li><a className='fa fa-angle-double-down' onClick={this.props.closeOtherPlaylists}> Close others</a>
        </li>
        <li>
          <a className='fa fa-folder-open-o' data-click='dropdown' data-for='openPlaylistDialog'> Open
            playlist</a>
        </li>
        <li>
          <a className='fa fa-floppy-o' data-click='dropdown' data-for='savePlaylistDialog'> Save playlist</a>
        </li>
      </ul>) : null
  }

  renderPlaylistCreationPopup = () => {
    return this.props.popups.playlistCreation ? (
      <div className='dropdown-menu' data-click='none'>
        <form
          onSubmit={this.createPlaylist}>
          <div className='form-group'>
            <label htmlFor='artists-filter'>Playlist name</label>
            <input type='text' className='form-control' ref='menuPlCreationInput' />
            <span>{this.props.errors.createPlaylist}</span>
          </div>
          <div className='btn-group'>
            <button type='submit' className='btn btn-primary'>Create</button>
          </div>
          <div className='btn-group'>
            <button type='button' className='btn btn-primary' data-click='closeall'>Cancel</button>
          </div>
        </form>
      </div>) : null
  }

  scrollRight = () => {
    if (this.props.tabs.length - this.props.scrolledTabs >= 2) {
      this.props.scrollRight()
    }
  }

  scrollLeft = () => {
    if (this.props.scrolledTabs > 0) {
      this.props.scrollLeft()
    }
  }

  volumeChanged = (e) => {
    this.props.setVolume((e.target.value / 20) * (e.target.value / 20))
  }

  drop = (e) => {
    e.preventDefault()
    let track = JSON.parse(e.dataTransfer.getData('track'))
    let playlistLength = this.props.pls[this.props.openTab].length
    if (track.immutable) {
      this.props.moveTrack(track, null, null, this.props.openTab, playlistLength)
    } else {
      let transferPlName = e.dataTransfer.getData('pl')
      let transferTrackPos = +e.dataTransfer.getData('pos')
      this.props.moveTrack(track, transferPlName, transferTrackPos, this.props.openTab, playlistLength)
    }
  }

  dragOver = (e) => {
    e.preventDefault()
  }

  createPlaylist = (e) => {
    e.preventDefault()
    this.props.createPlaylist(this.refs.menuPlCreationInput.value)
  }

  render() {
    let classes = cn({
      'sidebar': true,
      'sidebar_open': this.props.isOpen
    })
    let songs = this.props.pls[this.props.openTab]

    return (
      <div className={classes}>
        <div className='sidebar__widget'>
          <div className='playmenu'>

            <div className='playmenu__top'>
              <button type='button' className='btn btn-primary fa fa-fast-backward' />
              <button type='button' className='btn btn-primary fa fa-fast-forward' />
              <button type='button' className='btn btn-primary fa fa-retweet' />
              <button type='button' className='btn btn-primary fa fa-random' />
              <div className='playmenu__volume'>
                {this.props.muted ? (
                  <button type='button' className='btn btn-danger fa fa-volume-off' style={{width: 40}}
                    onClick={this.props.toggleMute} />
                ) : (
                  <button type='button' className='btn btn-primary fa fa-volume-up'
                    onClick={this.props.toggleMute} />
                )}
                <input type='range' className='playmenu__volume-slider'
                  min='1' max='20' defaultValue='10' onChange={this.volumeChanged} />
              </div>
            </div>

            <div className='playmenu__tabs'>
              <div className='playmenu__tabs-left'>
                <button className='btn btn-primary fa fa-chevron-left playmenu__tabs-control'
                  onClick={this.scrollLeft} />
              </div>

              <div className='playmenu__tabs-center'>
                <ul className='nav nav-tabs playmenu__tabs-list' style={{marginLeft: -this.props.scrolledTabs * 72}}>
                  {this.getTabs()}
                </ul>
              </div>

              <div className='playmenu__tabs-right dropdown open'>
                <button type='button' className='btn fa btn-primary fa-chevron-right playmenu__tabs-control'
                  onClick={this.scrollRight} />
                <button type='button' className='btn btn-primary fa fa-list playmenu__tabs-control'
                  data-click='dropdown' data-for='allPlaylists' />
                {this.props.popups.allPlaylists ? (
                  <ul className='dropdown-menu'>
                    {this.getTabs()}
                  </ul>) : ''}
              </div>
            </div>

            <div className='playmenu__list' onDrop={this.drop} onDragOver={this.dragOver}>
              <TrackList songs={songs} pl={this.props.openTab} immutable={false} className='tracklist_mini' />
            </div>

            <div className='playmenu__status'>
              Open: <b>{this.props.openTab}</b><br />
              Playing: <b>{this.props.currentPl}</b>
            </div>

            <div className='playmenu__bottom dropdown open'>
              <button type='button' className='btn btn-primary fa fa-check'
                data-click='dropdown' data-for='bottomAdd' />
              <button type='button' className='btn btn-primary fa fa-plus'
                data-click='dropdown' data-for='bottomAdd'> Add
              </button>
              <button type='button' className='btn btn-primary fa fa-minus'
                data-click='dropdown' data-for='bottomRemove'> Rem
              </button>
              <button type='button' className='btn btn-primary fa fa-sort'
                data-click='dropdown' data-for='bottomSort'> Sort
              </button>
              <button type='button' className='btn btn-primary fa fa-ellipsis-h'
                data-click='dropdown' data-for='bottomPls'> Playlist
              </button>

              {this.renderBottomAddPopup()}
              {this.renderBottomRemovePopup()}
              {this.renderBottomSortPopup()}
              {this.renderBottomPlaylistPopup()}

              {this.renderPlaylistCreationPopup()}

              {this.props.popups.openPlaylistDialog ? (
                <OpenPlaylistDialog playlist={this.props.pls[this.props.openTab]} />
              ) : null }

              {this.props.popups.savePlaylistDialog ? (
                <OpenPlaylistDialog playlist={this.props.pls[this.props.openTab]} forSave='true'
                  filename={this.props.openTab} />
              ) : null }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar
