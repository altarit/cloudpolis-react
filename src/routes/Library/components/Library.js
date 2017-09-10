import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import CreateCompilationsBulkForm from './CreateCompilationsBulkForm'
import './Library.scss'

export class Library extends React.Component {
  static propTypes = {
    libraryName: PropTypes.string,
    // fetching: PropTypes.bool,
    compilations: PropTypes.arrayOf(PropTypes.object).isRequired,

    createCompilationsBulkPopup: PropTypes.object,
    // moreCompilationsPopup: PropTypes.func,

    calculateBase: PropTypes.func.isRequired,
    getCompilations: PropTypes.func.isRequired,
    createCompilationsBulk: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getCompilations(this.props.libraryName)
  }

  createCompilationsBulk = (values) => {
    console.log(values)
    this.props.createCompilationsBulk(this.props.libraryName, values.data.replace(/\\/g, '/'), values.base)
  }

  render() {
    return (
      <div className='libraries container'>
        <h2>Library: {this.props.libraryName}</h2>
        <div className='btn-group card-body dropdown'>
          <button className='btn btn-outline-secondary' data-click='dropdown' data-for='createCompilationsBulkPopup'>
            Bulk Create Compilations
          </button>
          {this.props.createCompilationsBulkPopup ? (
            <div className='dropdown-menu show dropdown_fixed'
              style={{left: 40, top: 80, right: 40, bottom: 120}}
              data-click='none'
            >
              <CreateCompilationsBulkForm
                library={this.props.libraryName}
                onSubmit={this.createCompilationsBulk}
                calculateBase={this.props.calculateBase}
              />
            </div>
          ) : null}
        </div>
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
