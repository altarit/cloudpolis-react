import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export class Artists extends React.Component {

  static propTypes = {
    artists: PropTypes.arrayOf(PropTypes.string).isRequired,
    artistsMask: PropTypes.string,
    fetching: PropTypes.bool,

    getArtists: PropTypes.func.isRequired,
    changeArtistsFilter: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.getArtists()
    this.props.changeArtistsFilter('')
  }

  getArtists = () => {
    let result = []
    let rx = new RegExp(this.props.artistsMask, 'i')

    this.props.artists.forEach(artist => {
      if (rx.test(artist.name)) {
        result.push(
          <div key={artist.name}>
            <Link to={`/music/artists/${artist.name}`}>{artist.name}</Link>
          </div>
        )
      }
    })

    return result
  }

  changeFilter = (e) => {
    this.props.changeArtistsFilter(e.target.value)
  }

  clearFilter = () => {
    this.refs.artistsFilter.value = ''
    this.props.changeArtistsFilter('')
    this.refs.artistsFilter.focus()
  }

  render () {
    return (
      <div className='container'>
        <h2>Artists:</h2>
        <div className='btn-group'>
          <label>Filter</label>
          <input type='search' className='form-control' onChange={this.changeFilter} ref='artistsFilter' />
          <span id='searchclear' className='fa fa-close' onClick={this.clearFilter} />
        </div>
        {this.props.fetching ? (
          <div>Loading...</div>
        ) : (
          <div>
            {
              this.getArtists()
            }
          </div>
        )}
      </div>
    )
  }
}

export default Artists
