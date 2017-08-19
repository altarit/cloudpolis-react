import React, {PropTypes} from 'react'

import OpenPlaylistDialog from '../../OpenPlaylistDialog'

export class SidebarBottomMenu extends React.Component {
  static propTypes = {
    openTab: PropTypes.string.isRequired,
    pls: PropTypes.number.isRequired,
    popups: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,

    createPlaylist: PropTypes.func.isRequired,
    closeOpenPlaylist: PropTypes.func.isRequired,
    closeOtherPlaylists: PropTypes.func.isRequired,
    sortByTitle: PropTypes.func.isRequired,
    sortByArtist: PropTypes.func.isRequired,
    sortByDuration: PropTypes.func.isRequired,
    sortByPath: PropTypes.func.isRequired,
    shuffle: PropTypes.func.isRequired,
    reverse: PropTypes.func.isRequired,
  }

  createPlaylist = (e) => {
    e.preventDefault()
    this.props.createPlaylist(this.refs.menuPlCreationInput.value)
  }

  renderBottomAddPopup = () => {
    if (!this.props.popups.bottomAdd) return null
    let position = {bottom: this.props.popups.bottomAdd.ry + 20, left: this.props.popups.bottomAdd.x - 40}
    return (
      <ul className='dropdown-menu show dropdown_fixed' style={position}>
        <li><span className='option fa fa-plus'> From current page to "{this.props.openTab}"</span></li>
        <li><span className='option fa fa-plus'> From another playlist</span></li>
        <li><span className='option fa fa-plus'> Close other</span></li>
      </ul>
    )
  }

  renderBottomRemovePopup = () => {
    if (!this.props.popups.bottomRemove) return null
    let position = {bottom: this.props.popups.bottomRemove.ry + 20, left: this.props.popups.bottomRemove.x - 85}
    return (
      <ul className='dropdown-menu show dropdown_fixed' style={position}>
        <li><span className='option fa fa-minus'> Remove current track from playlist</span></li>
        <li><span className='option fa fa-minus'> Remove all in "{this.props.openTab}"</span></li>
        <li><span className='option fa fa-minus'> Remove selected tracks</span></li>
      </ul>
    )
  }

  renderBottomSortPopup = () => {
    if (!this.props.popups.bottomSort) return null
    let position = {bottom: this.props.popups.bottomSort.ry + 20, left: this.props.popups.bottomSort.x - 90}
    return (
      <ul className='dropdown-menu show dropdown_fixed' style={position}>
        <li><span className='option fa fa-sort' onClick={this.props.sortByTitle}> Sort by title</span></li>
        <li><span className='option fa fa-sort' onClick={this.props.sortByArtist}> Sort by artist</span></li>
        <li><span className='option fa fa-sort' onClick={this.props.sortByDuration}> Sort by duration</span></li>
        <li><span className='option fa fa-sort' onClick={this.props.sortByPath}> Sort by path</span></li>
        <li><span className='option fa fa-sort' onClick={this.props.shuffle}> Shuffle</span></li>
        <li><span className='option fa fa-sort' onClick={this.props.reverse}> Reverse</span></li>
      </ul>
    )
  }

  renderBottomPlaylistPopup = () => {
    if (!this.props.popups.bottomPls) return null
    let position = {bottom: this.props.popups.bottomPls.ry + 20, left: this.props.popups.bottomPls.x - 110}
    return (
      <ul className='dropdown-menu show dropdown_fixed' style={position}>
        <li>
          <span className='option fa fa-file-o' data-click='dropdown' data-for='playlistCreation'> New playlist</span>
        </li>
        <li>
          <span className='option fa fa-times' onClick={this.props.closeOpenPlaylist}> Close playlist</span>
        </li>
        <li>
          <span className='option fa fa-angle-double-down' onClick={this.props.closeOtherPlaylists}> Close others</span>
        </li>
        <li>
          <span className='option fa fa-folder-open-o' data-click='dropdown' data-for='openPlaylistDialog'> Open playlist</span>
        </li>
        <li>
          <span className='option fa fa-floppy-o' data-click='dropdown' data-for='savePlaylistDialog'> Save playlist</span>
        </li>
      </ul>
    )
  }

  renderPlaylistCreationPopup = () => {
    if (!this.props.popups.playlistCreation) return null
    return (
      <div className='dropdown-menu show' data-click='none'>
        <form onSubmit={this.createPlaylist}>
          <div className='form-group'>
            <label htmlFor='artists-filter'>Playlist name</label>
            <input type='text' className='form-control' ref='menuPlCreationInput'/>
            <span>{this.props.errors.createPlaylist}</span>
          </div>
          <div className='btn-group'>
            <button type='submit' className='btn btn-primary'>Create</button>
          </div>
          <div className='btn-group'>
            <button type='button' className='btn btn-primary' data-click='closeall'>Cancel</button>
          </div>
        </form>
      </div>
    )
  }

  render() {
    let openTab = this.props.openTab

    return (
      <div className='playmenu__bottom dropdown'>
        <button type='button' className='btn btn-def fa fa-check' data-click='dropdown' data-for='bottomAdd'>
        </button>
        <button type='button' className='btn btn-def fa fa-plus' data-click='dropdown' data-for='bottomAdd'>
          <label>Add</label>
        </button>
        <button type='button' className='btn btn-def fa fa-minus' data-click='dropdown' data-for='bottomRemove'>
          <label>Remove</label>
        </button>
        <button type='button' className='btn btn-def fa fa-sort' data-click='dropdown' data-for='bottomSort'>
          <label>Sort</label>
        </button>
        <button type='button' className='btn btn-def fa fa-ellipsis-h' data-click='dropdown' data-for='bottomPls'>
          <label>Playlist</label>
        </button>

        {this.renderBottomAddPopup()}
        {this.renderBottomRemovePopup()}
        {this.renderBottomSortPopup()}
        {this.renderBottomPlaylistPopup()}
        {this.renderPlaylistCreationPopup()}

        {this.props.popups.openPlaylistDialog ? (
          <OpenPlaylistDialog playlist={this.props.pls[openTab]}/>
        ) : null }

        {this.props.popups.savePlaylistDialog ? (
          <OpenPlaylistDialog playlist={this.props.pls[openTab]} forSave='true' filename={openTab}/>
        ) : null }
      </div>
    )
  }
}

SidebarBottomMenu.propTypes = {
  popups: PropTypes.object.isRequired,
  openTab: PropTypes.string.isRequired,
  pls: PropTypes.object.isRequired,

  closeOpenPlaylist: PropTypes.func.isRequired,
  closeOtherPlaylists: PropTypes.func.isRequired,
  createPlaylist: PropTypes.func.isRequired,
}

export default SidebarBottomMenu
