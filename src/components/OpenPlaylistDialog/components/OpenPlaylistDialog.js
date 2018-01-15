import React from 'react'
import PropTypes from 'prop-types'

import './OpenPlaylistDialog.scss'

export class OpenPlaylistDialog extends React.Component {
  static propTypes = {
    safePlaylists: PropTypes.arrayOf(PropTypes.string).isRequired,
    serverPlaylists: PropTypes.arrayOf(PropTypes.string).isRequired,
    playlist: PropTypes.object.isRequired,
    forSave: PropTypes.bool.isRequired,
    filename: PropTypes.string,
    userName: PropTypes.string,
    isLocal: PropTypes.string,

    loadPlaylistsFromStorage: PropTypes.func.isRequired,
    savePlaylistToStorage: PropTypes.func.isRequired,
    openPlaylistFromStorage: PropTypes.func.isRequired,
    deletePlaylistFromStorage: PropTypes.func.isRequired,
    getServerPlaylists: PropTypes.func.isRequired,
    openServerPlaylist: PropTypes.func.isRequired,
    putServerPlaylist: PropTypes.func.isRequired,
    deleteServerPlaylist: PropTypes.func.isRequired,
    selectOpenDialogLocalTab: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadPlaylistsFromStorage()
    this.refs.filename.value = this.props.filename || ''
    this.props.getServerPlaylists(this.props.userName || 'none')
  }

  openOrSavePlaylist = (e) => {
    e.preventDefault()

    let filename = this.refs.filename.value
    let playlist = this.props.playlist
    if (this.props.isLocal) {
      if (this.props.forSave) {
        this.props.savePlaylistToStorage(filename, playlist)
      } else {
        this.props.openPlaylistFromStorage(filename)
      }
    } else {
      if (this.props.forSave) {
        this.props.putServerPlaylist(this.props.userName, filename, playlist)
      } else {
        this.props.openServerPlaylist(filename)
      }
    }
  }

  selectFile = (e) => {
    this.refs.filename.value = e.target.innerHTML
  }

  openFile = (e) => {
    this.props.openPlaylistFromStorage(e.target.innerHTML)
  }

  deleteFile = (e) => {
    this.props.deletePlaylistFromStorage(e.target.parentNode.children[0].innerHTML)
  }

  openRemoteFile = (e) => {
    this.props.openServerPlaylist(e.target.innerHTML)
  }

  deleteRemoteFile = (e) => {
    this.props.deleteServerPlaylist(this.props.userName, e.target.parentNode.children[0].innerHTML)
  }

  openLocalTab = (e) => {
    this.props.selectOpenDialogLocalTab(true)
  }

  openRemoteTab = (e) => {
    this.props.selectOpenDialogLocalTab(false)
  }

  render() {
    return (
      <div className='dropdown show dropdown-menu filedialog' data-click='none'>
        <div className='filedialog__top'>
          <h3>{this.props.forSave ? 'Save playlist' : 'Open playlist'}</h3>
          <button className={'btn ' + (this.props.isLocal ? 'btn-secondary' : 'btn-outline-secondary')}
            onClick={this.openLocalTab}>Local storage</button>
          <button className={'btn ' + (!this.props.isLocal ? 'btn-secondary' : 'btn-outline-secondary')}
            onClick={this.openRemoteTab}>Server storage</button>
        </div>
        <ul className='filedialog__list'>
          {this.props.isLocal
            ? Object.keys(this.props.safePlaylists).map(pl => (
              <li key={pl}>
                <span onClick={this.selectFile} onDoubleClick={this.openFile}>{pl}</span>
                <a className='fa fa-trash-o' onClick={this.deleteFile} />
              </li>
            ))
            : this.props.serverPlaylists.map(pl => (
              <li key={pl.name}>
                <span onClick={this.selectFile} onDoubleClick={this.openRemoteFile}>{pl.name}</span>
                <a className='fa fa-trash-o' onClick={this.deleteRemoteFile} />
              </li>
            ))}
        </ul>
        <form className='filedialog__bottom' onSubmit={this.openOrSavePlaylist}>
          <div className='form-group'>
            <label>Filename</label>
            <input type='text' className='form-control' ref='filename' />
          </div>
          {this.props.forSave ? (
            <div className='btn-group'>
              <button type='submit' className='btn btn-primary'>Save</button>
            </div>
          ) : (
            <div className='btn-group'>
              <button type='submit' className='btn btn-primary'>Open</button>
            </div>
          )}
          <div className='btn-group'>
            <button type='button' className='btn btn-primary' data-click='closeall'>Cancel</button>
          </div>
        </form>
      </div>
    )
  }
}

export default OpenPlaylistDialog
