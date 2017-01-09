import React from 'react';
import {Link} from 'react-router';

import Track from '../../../components/Track'
import {SEARCH_PL} from '../../../modules/player'

export class Search extends React.Component {

  componentDidMount() {
    this.props.getTracksByQuery('');
  }

  getPlaylist = () => {
    let current = this.props.songs
    if (current) {
      let currentSrc = this.props.track && (this.props.track.href || this.props.track.src)
      let i = 0
      return current.map(track => (
        <Track key={i} {...track}
               playing={currentSrc && (track.src || track.href) == currentSrc && (this.props.currentPl == SEARCH_PL)}
               pl={SEARCH_PL}
               pos={i++}
               immutable={true}
        />
      ))
    } else {
      return <div>Empty</div>
    }
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
      <div>
        <h2>Search</h2>
        <form className="form-horizontal form-search" className="form-search">
          <div className="btn-group">
            <label>Query</label>
            <input type="search" className="form-control" onChange={this.changeFilter} ref="searchQuery"/>
            <span id="searchclear" className="fa fa-close" onClick={this.clearFilter}></span>
          </div>
        </form>
        <div>
          {!this.props.songs ? (
            <div>Loading...</div>
          ) : (
            <div>
              <ul>
                {this.getPlaylist()}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Search;
