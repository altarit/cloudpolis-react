import React, {PropTypes} from 'react'

import LogoImage from '../assets/logo.png'
import './HomeView.scss'
import TrackList from '../../../components/TrackList'
import {DEFAULT_PL} from '../../../modules/player/playerConstants'

export class HomeView extends React.Component {

  static propTypes = {
    tracks: PropTypes.arrayOf(PropTypes.object),
    fetchingTracks: PropTypes.bool,
    currentPl: PropTypes.string,
    track: PropTypes.object,
    sidebar: PropTypes.bool.isRequired,

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
          <div className='col-md-6'>
            <h2>Welcome to Cloudpolis!</h2>

            <div className='row'>
              <div className='col-sm-7'>
                <img
                  alt='Cloudpolis Logo!'
                  className='logo'
                  src={LogoImage} />
              </div>

              <div className='col-sm-5'>
                Tracks: 2147<br />
                Artists: 248<br />
                Total duration: 9d 8h 47m<br />
                Total size: 21Gb<br />
                Average bitrate: 217kb/s<br />
                Most tracks in 320kb/s

              </div>
            </div>
            It's a cloud music player. At first I wrote it for my own personal use, but I don't mind if anybody uses
            it.<br />

          </div>
          <div className='col-md-6'>
            <h2>Random tracks</h2>
            <TrackList songs={this.props.tracks} pl={DEFAULT_PL} immutable updatePlaylist={this.updatePlaylist} />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-4'>
            <h3>Functionality</h3>
            Cloudpolis is meant to be as advanced and intuitive as popular desktop music players.
            It has lots features for managing playlists and sorting tracks
            so you can build your personal playlists fast and easy.<br />
            {/* I won't be lying if I said I was inpired by AIMP and took some ideas from it. */}
          </div>
          <div className='col-md-4'>
            <h3>Quality</h3>
            All tracks in my collection have highest bitrate I could find for mp3.
            I have some free space on server so if you like Cloudpolis and want more tracks to be in the library feel
            free to contact me.
          </div>
          <div className='col-md-4'>
            <h3>Cross-platform</h3>
            Cloudpolis works on mobile devices as well as on desktop browsers.
            However you need good internet connection to listen to music online.
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <h2>Featured artists</h2>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <h2>Useful links</h2>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <h2>More</h2>
            If you have any questions, please feel free to contact me at
            <a href='mailto:admin@cloudpolis.ru'>admin@cloudpolis.ru</a>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeView
