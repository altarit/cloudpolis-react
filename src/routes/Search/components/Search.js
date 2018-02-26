import React from 'react'
import PropTypes from 'prop-types'

import TrackList from '../../../components/TrackList'
import {SEARCH_PL} from '../../../modules/player/playerConstants'
import Input from '../../../components/Input'

export class Search extends React.Component {
  static propTypes = {
    songs: PropTypes.arrayOf(PropTypes.object),
    // fetching: PropTypes.bool,

    getTracksByQuery: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getTracksByQuery('')
  }

  changeFilter = (newValue) => {
    this.props.getTracksByQuery(newValue)
  }

  render() {
    return (
      <div className='container'>
        <h2>Search</h2>
        regexp is supported ^_^
        <Input onChange={this.changeFilter} delay={300}/>
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
