import React, {PropTypes} from 'react'

import TrackList from '../../../components/TrackList'
import {SEARCH_PL} from '../../../modules/player/playerConstants'

export class Search extends React.Component {

  static propTypes = {
    songs: PropTypes.arrayOf(PropTypes.object),
    fetching: PropTypes.bool,

    getTracksByQuery: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getTracksByQuery('')
  }

  changeFilter = (e) => {
    this.props.getTracksByQuery(e.target.value)
  }

  clearFilter = () => {
    this.refs.searchQuery.value = ''
    this.props.getTracksByQuery('')
    this.refs.searchQuery.focus()
  }

  render() {
    return (
      <div className='container'>
        <h2>Search</h2>
        <form className='form-horizontal form-search'>
          <div className='btn-group'>
            <label>Query</label>
            <input type='search' className='form-control' onChange={this.changeFilter} ref='searchQuery' />
            <span id='searchclear' className='fa fa-close' onClick={this.clearFilter} />
          </div>
        </form>
        <div>
          {!this.props.songs ? (
            <div>Loading...</div>
          ) : (
            <div>
              <TrackList songs={this.props.songs} pl={SEARCH_PL} immutable />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Search
