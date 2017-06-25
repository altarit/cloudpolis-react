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
    let position = {bottom: this.props.popups.bottomAdd.ry + 20, left: this.props.popups.bottomAdd.x - 125}
    return (
      <ul className='dropdown-menu show dropdown_fixed' style={position}>
        <li><a className='fa fa-plus'> From current page to "{this.props.openTab}"</a></li>
        <li><a className='fa fa-plus'> From another playlist</a></li>
        <li><a className='fa fa-plus'> Close other</a></li>
      </ul>
    )
  }

  renderBottomRemovePopup = () => {
    if (!this.props.popups.bottomRemove) return null
    let position = {bottom: this.props.popups.bottomRemove.ry + 20, left: this.props.popups.bottomRemove.x - 175}
    return (
      <ul className='dropdown-menu show dropdown_fixed' style={position}>
        <li><a className='fa fa-minus'> Remove current track from playlist</a></li>
        <li><a className='fa fa-minus'> Remove all in "{this.props.openTab}"</a></li>
        <li><a className='fa fa-minus'> Remove selected tracks</a></li>
      </ul>
    )
  }

  renderBottomSortPopup = () => {
    if (!this.props.popups.bottomSort) return null
    let position = {bottom: this.props.popups.bottomSort.ry + 20, left: this.props.popups.bottomSort.x - 175}
    return (
      <ul className='dropdown-menu show dropdown_fixed' style={position}>
        <li><a className='fa fa-sort' onClick={this.props.sortByTitle}> Sort by title</a></li>
        <li><a className='fa fa-sort' onClick={this.props.sortByArtist}> Sort by artist</a></li>
        <li><a className='fa fa-sort' onClick={this.props.sortByDuration}> Sort by duration</a></li>
        <li><a className='fa fa-sort' onClick={this.props.sortByPath}> Sort by path</a></li>
        <li><a className='fa fa-sort' onClick={this.props.shuffle}> Shuffle</a></li>
        <li><a className='fa fa-sort' onClick={this.props.reverse}> Reverse</a></li>
      </ul>
    )
  }

  renderBottomPlaylistPopup = () => {
    if (!this.props.popups.bottomPls) return null
    let position = {bottom: this.props.popups.bottomPls.ry + 20, left: this.props.popups.bottomPls.x - 175}
    return (
      <ul className='dropdown-menu show dropdown_fixed' style={position}>
        <li>
          <a className='fa fa-file-o' data-click='dropdown' data-for='playlistCreation'> New playlist</a>
        </li>
        <li>
          <a className='fa fa-times' onClick={this.props.closeOpenPlaylist}> Close playlist</a>
        </li>
        <li>
          <a className='fa fa-angle-double-down' onClick={this.props.closeOtherPlaylists}> Close others</a>
        </li>
        <li>
          <a className='fa fa-folder-open-o' data-click='dropdown' data-for='openPlaylistDialog'> Open playlist</a>
        </li>
        <li>
          <a className='fa fa-floppy-o' data-click='dropdown' data-for='savePlaylistDialog'> Save playlist</a>
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
      </div>
    )
  }

  render() {
    let openTab = this.props.openTab

    return (
      <div className='playmenu__bottom dropdown'>
        <button type='button' className='btn btn-primary fa fa-check' data-click='dropdown' data-for='bottomAdd' />
        <button type='button' className='btn btn-primary fa fa-plus' data-click='dropdown' data-for='bottomAdd'>
          Add
        </button>
        <button type='button' className='btn btn-primary fa fa-minus' data-click='dropdown' data-for='bottomRemove'>
          Rem
        </button>
        <button type='button' className='btn btn-primary fa fa-sort' data-click='dropdown' data-for='bottomSort'>
          Sort
        </button>
        <button type='button' className='btn btn-primary fa fa-ellipsis-h' data-click='dropdown' data-for='bottomPls'>
          Playlist
        </button>

        {this.renderBottomAddPopup()}
        {this.renderBottomRemovePopup()}
        {this.renderBottomSortPopup()}
        {this.renderBottomPlaylistPopup()}
        {this.renderPlaylistCreationPopup()}

        {this.props.popups.openPlaylistDialog ? (
          <OpenPlaylistDialog playlist={this.props.pls[openTab]} />
        ) : null }

        {this.props.popups.savePlaylistDialog ? (
          <OpenPlaylistDialog playlist={this.props.pls[openTab]} forSave='true' filename={openTab} />
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
