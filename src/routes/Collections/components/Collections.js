import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import TrackList from '../../../components/TrackList'
import {DEFAULT_PL} from '../../../modules/player/playerConstants'

import './Collections.scss'

export class Collections extends React.Component {
  static propTypes = {
    collections: PropTypes.arrayOf(PropTypes.object),

    getCollections: PropTypes.func.isRequired,
    toggleTree: PropTypes.func.isRequired,
    deleteCollections: PropTypes.func.isRequired,
    deleteSongs: PropTypes.func.isRequired,
    extractSongs: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    this.props.getCollections('/')
  }

  toggleTree = (path) => {
    this.props.toggleTree(path)
    this.props.getCollections(path + '/')
  }

  deleteCollections = () => {
    this.props.deleteCollections()
  }

  deleteSongs = () => {
    this.props.deleteSongs()
  }

  extractSongs = () => {
    this.props.extractSongs()
  }

  getDirs = (dirs, base) => {
    return (
      <ul className='list-group library__container'>
        {!dirs ? (
          <div>Loading...</div>
        ) : (!dirs.length) ? (
          <div>No dirs</div>
        ) : dirs.map(elem => (
          <li key={elem.name} className='list-group-item library__dir'>
            <div className='library__title'>
              <button className='btn btn-secondary btn-sm' onClick={() => { this.toggleTree(`${base}/${elem.name}`) }}>
                {elem.open ? '-' : '+'}
              </button>
              <Link to={`/music/collections/${elem.name}`}> {elem.name}</Link>
              {/* <div className='btn-group-sm library__dir-buttons'>
                <button className='btn btn-secondary btn-sm'>
                  <Link to={'/music/collections/create' + base + '/' + elem.name + '/'}>Add</Link>
                </button>
                <button className='btn btn-secondary btn-sm'>
                  Edit
                </button>
              </div> */}
            </div>
            {elem.open ? (
              <div>
                {this.getDirs(elem.dirs, `${base}/${elem.name}`)}
                <TrackList songs={elem.tracks || []} pl={`${base}/${elem.name}`} immutable
                  updatePlaylist={this.updatePlaylist} />
              </div>
            ) : null}

          </li>
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className='container library'>
        <h2>Collections:</h2>
        <div>
          <Link to='/music/collections/create/'>Collections Manager</Link>
        </div>
        <div className='btn-group'>
          <button className='btn btn-primary'>Add</button>
          <button type='submit' className='btn btn-primary' onClick={this.deleteCollections}>Delete Artists</button>
          <button type='submit' className='btn btn-primary' onClick={this.deleteSongs}>Delete Songs</button>
          <button type='submit' className='btn btn-primary' onClick={this.extractSongs}>Extract Songs</button>
        </div>
        <div>
          {this.getDirs(this.props.dirs, '')}
        </div>
      </div>
    )
  }
}

export default Collections
