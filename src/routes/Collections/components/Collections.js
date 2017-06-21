import React, {PropTypes} from 'react'
import {Link} from 'react-router'

export class Collections extends React.Component {
  static propTypes = {
    collections: PropTypes.arrayOf(PropTypes.object),

    getCollections: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    this.props.getCollections()
  }

  render() {
    return (
      <div className='container'>
        <h2>Collections:</h2>
        <div>
          <Link to='/music/collections_manager'>Collections Manager</Link>
        </div>
        <ul className='list-group'>
          {this.props.collections.map(collection => (
            <li key={collection.name} className='list-group-item'>
              <Link to={`/music/collections/${collection.name}`}>{collection.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Collections
