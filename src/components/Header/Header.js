import React, {PropTypes} from 'react'
import {IndexLink, Link} from 'react-router'

import './Header.scss'
import Auth from '../Auth'

export class Header extends React.Component {
  static propTypes = {
    sidebar: PropTypes.bool.isRequired,
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
      <nav className={'container navbar navbar-light bg-faded navbar-header ' +
      (this.props.sidebar ? 'navbar-expand-lg' : 'navbar-expand-sm')}>
        <IndexLink className='navbar-brand' activeClassName='route--active' to='/'>Cloudpolis</IndexLink>
        <button
          className='navbar-toggler navbar-toggler-right'
          type='button'
          onClick={this.toggleNav}>
          <span className='navbar-toggler-icon'/>
        </button>
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
