import React from 'react'

import './OpenPlaylistDialog.scss'


export class OpenPlaylistDialog extends React.Component {

  componentDidMount() {
    this.props.loadPlaylistsFromStorage()
    this.refs.filename.value = this.props.filename || ''
  }

  openOrSavePlaylist = () => {
    let filename = this.refs.filename.value
    let playlist = this.props.playlist
    if (this.props.forSave) {
      this.props.savePlaylistsToStorage(filename, playlist)
    } else {
      this.props.openPlaylistFromStorage(filename)
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

  render() {
    return (
      <div className="dropdown open dropdown-menu filedialog" data-click="none">
        <h3>{this.props.forSave ? 'Save playlist' : 'Open playlist'}</h3>
        <ul className="filedialog__list">
          {Object.keys(this.props.safePlaylists).map(pl => (
            <li key={pl}>
              <span onClick={this.selectFile} onDoubleClick={this.openFile}>{pl}</span>
              <a className="fa fa-trash-o" onClick={this.deleteFile}></a>
            </li>
          ))}
        </ul>
        <form onSubmit={(e) => {e.preventDefault(); this.openOrSavePlaylist()}}>
          <div className="form-group">
            <label htmlFor="artists-filter">Filename</label>
            <input type="text" className="form-control" ref="filename"/>
          </div>
          {this.props.forSave ? (
            <div className="btn-group">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          ) : (
            <div className="btn-group">
              <button type="submit" className="btn btn-primary">Open</button>
            </div>
          )}
          <div className="btn-group">
            <button type="button" className="btn btn-primary" data-click="closeall">Cancel</button>
          </div>
        </form>
      </div>
    )
  }
}

export default OpenPlaylistDialog
