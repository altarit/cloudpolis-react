import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import './Libraries.scss'

export class Libraries extends React.Component {
  static propTypes = {
    libraries: PropTypes.arrayOf(PropTypes.object).isRequired,
    // fetching: PropTypes.bool,
    addLibraryPopup: PropTypes.object,
    moreLibrariesPopup: PropTypes.object,
    deleteLibraryDialog: PropTypes.object,

    getLibraries: PropTypes.func.isRequired,
    createLibrary: PropTypes.func.isRequired,
    deleteLibrary: PropTypes.func.isRequired,

    deleteCollections: PropTypes.func.isRequired,
    deleteSongs: PropTypes.func.isRequired,
    extractSongs: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getLibraries()
  }

  createLibrary = (values) => {
    this.props.createLibrary(values.name)
  }

  deleteLibrary = () => {
    this.props.deleteLibrary(this.props.moreLibrariesPopup.from)
  }

  render() {
    return (
      <div className='libraries container'>
        <h2>Libraries</h2>
        <div className='btn-group card-body'>
          <button className='btn btn-outline-secondary' onClick={this.createLibrary} data-click='custom'>
            Create Library
          </button>
          <button className='btn btn-outline-secondary' onClick={this.props.deleteCollections}>
            Delete Artists
          </button>
          <button className='btn btn-outline-secondary' onClick={this.props.deleteSongs}>
            Delete Songs
          </button>
          <button className='btn btn-outline-secondary' onClick={this.props.extractSongs}>
            Extract Songs
          </button>
        </div>
        <ul className='libraries-list list-group'>
          {this.props.libraries.map(el =>
            <li key={el.name}
                className='list-group-item list-group-item-action
                           flex-row align-items-center d-flex h-100 justify-content-between'>
              <Link to={`/music/libraries/${el.name}`} className='list-group-item-action'>
                {el.name}
              </Link>
              <button type='button' className='btn btn-def fa'
                      data-for='moreLibrariesPopup' data-click='dropdown' data-from={el.name}>
                ...
              </button>
            </li>
          )}
        </ul>
        <div className='dropdown'>
          {this.props.moreLibrariesPopup ? (
            <ul className='dropdown-menu show dropdown_fixed'
                style={{
                  top: this.props.moreLibrariesPopup.y - 10,
                  left: this.props.moreLibrariesPopup.x - 160,
                }}>
              <li onClick={this.deleteLibrary} data-click='custom'>
                <span className='option fa fa-trash-o'> Delete</span>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    )
  }
}

export default Libraries
