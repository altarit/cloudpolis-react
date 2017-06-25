import React from 'react'
import {IndexLink, Link} from 'react-router'

import './Header.scss'
import Auth from '../Auth'

export class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {collapse: true}
  }

  toggleNav = () => {
    this.setState({collapse: !this.state.collapse})
  }

  render() {
    return (
      <nav className='container navbar navbar-toggleable-md navbar-light bg-faded'>
        <button
          className='navbar-toggler navbar-toggler-right'
          type='button'
          onClick={this.toggleNav}>
          <span className='navbar-toggler-icon' />
        </button>
        <h1 className='navbar-brand mb-0'>
          <IndexLink className='navbar-brand' activeClassName='route--active' to='/'>Cloudpolis</IndexLink>
        </h1>
        <div className={'navbar-collapse ' + (this.state.collapse ? 'collapse' : '')}>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to='/music/artists' className='nav-link' activeClassName='route--active'>
                Artists
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/music/search' className='nav-link' activeClassName='route--active'>
                Search
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/users' className='nav-link' activeClassName='route--active'>
                Users
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/admin' className='nav-link' activeClassName='route--active'>
                Admin
              </Link>
            </li>
          </ul>
          <Auth />
        </div>
      </nav>
    )
  }
}

export default Header
