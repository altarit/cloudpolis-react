import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import LogoImage from '../assets/logo.png'
import './HomeView.scss'
import TrackList from '../../../components/TrackList'
import {DEFAULT_PL} from '../../../modules/player/playerConstants'

export class HomeView extends React.Component {
  static propTypes = {
    tracks: PropTypes.arrayOf(PropTypes.object),

    getFeaturedTracks: PropTypes.func.isRequired,
    updatePlaylist: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getFeaturedTracks()
  }

  updatePlaylist = () => {
    this.props.updatePlaylist(null, this.props.tracks)
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6'>
            <h2>Welcome to Cloudpolis!</h2>

            <div className='row'>
              <div className='col-md-7'>
                <img
                  alt='Cloudpolis Logo!'
                  className='logo'
                  src={LogoImage} />
              </div>

              <div className='col-md-5'>
                Tracks: 2147<br />
                Artists: 248<br />
                Total duration: 9d 8h 47m<br />
                Total size: 21Gb<br />

              </div>
            </div>

          </div>
          <div className='col-lg-6'>
            <h2>Random tracks</h2>
            <TrackList songs={this.props.tracks} pl={DEFAULT_PL} immutable updatePlaylist={this.updatePlaylist} />
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-4'>
            <h3>What's this?</h3>
            It's a music app. I wrote it for my own personal use,
            but it'd be great if anybody uses it. I'd like to take any feedbacks to make it better.
          </div>
          <div className='col-lg-4'>
            <h3>How to?</h3>
            I've added lots of cool things but tried to keep it easy to use and understand.
            If you think it's not, <Link to={'/howto'}>check out this</Link>.

          </div>
          <div className='col-lg-4'>
            <h3>More music?</h3>
            There's some more space on the server so I could add something. Either you can set up your own server.
            Feel free to <Link to={'/contacts'}>contact me</Link>.
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-12'>
            <h2>Featured artists</h2>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-12'>
            <h2>Useful links</h2>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-12'>
            <h2>More</h2>
            If you have any questions, please feel free to contact me at
            <a href='mailto:admin@cloudpolis.ru'> admin@cloudpolis.ru</a>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeView
