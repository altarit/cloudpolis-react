import React, {PropTypes} from 'react'
import {NavLink, Link} from 'react-router-dom'

import './Header.scss'
import Auth from '../Auth'

export class Header extends React.Component {
  static propTypes = {
    mobile: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {collapse: true}
  }

  toggleNav = () => {
    this.setState({collapse: !this.state.collapse})
  }

  render() {
    return (
      <nav className='container navbar navbar-light bg-faded navbar-header navbar-expand'>
        <div className={'navbar-collapse' + (this.props.mobile ? ' navbar-header-mobile' : '')}>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <NavLink className='navbar-brand nav-link' activeClassName='route--active' to='/'>
                <span className='fa fa-cloud' />
                <span className='navbar__link-label d-none d-sm-inline'>Cloudpolis</span>
                <span className='navbar__link-label d-sm-none'>Home</span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <Link to='/music/libraries' className='nav-link' activeClassName='route--active'>
                <span className='fa fa-book' />
                <span className='navbar__link-label'>Libraries</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/music/artists' className='nav-link' activeClassName='route--active'>
                <span className='fa fa-music' />
                <span className='navbar__link-label'>Artists</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/music/playlists' className='nav-link' activeClassName='route--active'>
                <span className='fa fa-star' />
                <span className='navbar__link-label'>Playlists</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/music/search' className='nav-link' activeClassName='route--active'>
                <span className='fa fa-search' />
                <span className='navbar__link-label'>Search</span>
              </Link>
            </li>
            {/*
            <li className='nav-item'>
              <Link to='/users' className='nav-link' activeClassName='route--active'>
                <span className='fa fa-users' />
                <span className='navbar__link-label'>Users</span>
              </Link>
            </li>
            */}
          </ul>
          <Auth />
        </div>
      </nav>
    )
  }
}

export default Header
