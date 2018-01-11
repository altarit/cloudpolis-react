import React, {PropTypes} from 'react'
import {Link} from 'react-router-dom'

import './Artist.scss'
import Input from '../../../components/Input'

export class Artists extends React.Component {
  static propTypes = {
    filteredArtists: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetching: PropTypes.bool,

    getArtists: PropTypes.func.isRequired,
    changeArtistsFilter: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getArtists()
    this.props.changeArtistsFilter('')
  }

  changeFilter = (newValue) => {
    this.props.changeArtistsFilter(newValue)
  }

  render() {
    return (
      <div className='container'>
        <h2>Artists:</h2>
        <Input onChange={this.changeFilter} />
        {this.props.fetching ? (
          <div>Loading...</div>
        ) : (
          <ul className='libraries-list list-group'>
            {this.props.filteredArtists.map(comp =>
              <li key={comp.name}
                className='list-group-item list-group-item-action
                           flex-row align-items-center d-flex h-100 justify-content-between'>
                <Link to={`/music/libraries/${comp.library}/${comp.name}`} className='list-group-item-action'>
                  {comp.name}
                </Link>
                <button type='button' className='btn btn-def fa'
                  data-for='moreCompilationsPopup' data-click='dropdown' data-from={comp.name}>
                  ...
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    )
  }
}

export default Artists
