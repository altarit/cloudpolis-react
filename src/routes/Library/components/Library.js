import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import './Library.scss'

export class Library extends React.Component {
  static propTypes = {
    libraryName: PropTypes.string,
    // fetching: PropTypes.bool,
    compilations: PropTypes.arrayOf(PropTypes.object).isRequired,

    getCompilations: PropTypes.func.isRequired,
    createCompilationsBulk: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getCompilations(this.props.libraryName)
  }

  render() {
    return (
      <div className='libraries container'>
        <h2>Library: {this.props.libraryName}</h2>
        <ul className='libraries-list list-group'>
          {this.props.compilations.map(el =>
            <li key={el.name}
              className='list-group-item list-group-item-action
                           flex-row align-items-center d-flex h-100 justify-content-between'>
              <Link to={`/music/libraries/${this.props.libraryName}/${el.name}`} className='list-group-item-action'>
                {el.name}
              </Link>
              <button type='button' className='btn btn-def fa'
                data-for='moreCompilationsPopup' data-click='dropdown' data-from={el.name}>
                ...
              </button>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default Library
