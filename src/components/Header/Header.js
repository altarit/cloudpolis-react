import React from 'react'
import {IndexLink, Link} from 'react-router'
import './Header.scss'
import Auth from '../Auth'

export const Header = () => (
  <nav className='container navbar navbar-default'>
    <div className='navbar-heeader'>
      <h1>
        <IndexLink className='navbar-brand' activeClassName='route--active' to='/'>Cloudpolis</IndexLink>
      </h1>
    </div>
    <div>
      <ul className='nav navbar-nav'>
        <li>
          <Link to='/music/artists' activeClassName='route--active'>
            Artists
          </Link>
        </li>
        <li>
          <Link to='/music/search' activeClassName='route--active'>
            Search
          </Link>
        </li>
        <li>
          <Link to='/users' activeClassName='route--active'>
            Users
          </Link>
        </li>
        <li>
          <Link to='/admin' activeClassName='route--active'>
            Admin
          </Link>
        </li>
      </ul>
      <Auth />
    </div>
  </nav>
)

export default Header
