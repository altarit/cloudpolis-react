import React from 'react'
import {IndexLink, Link} from 'react-router'
import './Header.scss'

export const Header = () => (
  <div className='container'>
    <h1>React Redux Starter Kit</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName='route--active'>
      Counter
    </Link>
    {' · '}
    <Link to='/third' activeClassName='route--active'>
      Third
    </Link>
    {' · '}
    <Link to='/music/artists' activeClassName='route--active'>
      Artists
    </Link>
    {' · '}
    <Link to='/music/search' activeClassName='route--active'>
      Search
    </Link>
  </div>
)

export default Header
