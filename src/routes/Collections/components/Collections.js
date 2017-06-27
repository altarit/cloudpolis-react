import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import './Collections.scss'

export class Collections extends React.Component {
  static propTypes = {
    collections: PropTypes.arrayOf(PropTypes.object),

    getCollections: PropTypes.func.isRequired,
    toggleTree: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    this.props.getCollections()
  }

  getDirs = (dirs, base) => {
    if (!dirs) return null

    return (
      <ul className='list-group library-container'>
        {dirs.map(elem => (
          <li key={elem.name} className='list-group-item library-dir'>
            <div className='library-title'>
              <button className='btn btn-secondary btn-sm' onClick={() => {this.props.toggleTree(`${base}/${elem.name}`)}}>
                {elem.open ? '-' : '+'}
              </button>
              <Link to={`/music/collections/${elem.name}`}> {elem.name}</Link>
            </div>
            {this.getDirs(elem.dirs, `${base}/${elem.name}`)}
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
          <Link to='/music/collections_manager'>Collections Manager</Link>
        </div>
        <div className='btn-group'>
          <button className='btn btn-primary'>Add</button>
        </div>
        <div>
          {this.getDirs(this.props.dirs, '')}
        </div>
      </div>
    )
  }
}

export default Collections
