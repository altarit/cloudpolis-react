import React from 'react'
import {Header} from 'components/Header/Header'
import {Link} from 'react-router'
import {shallow} from 'enzyme'

describe('(Component) Header', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Header />)
  })

  it('Renders a welcome message', () => {
    const welcome = _wrapper.find('.navbar-header')
    expect(welcome).to.exist()
    expect(welcome.contains(
      <span className='navbar__link-label d-none d-sm-inline'>Cloudpolis</span>
    )).to.be.true()
    // expect(homeLink.text()).to.match(/Cloudpolis/)
  })

  describe('Navigation links...', () => {
    it('Should render a Link to Artists route', () => {
      expect(_wrapper.contains(
        <Link to='/music/artists' className='nav-link' activeClassName='route--active'>
          <span className='fa fa-music' />
          <span className='navbar__link-label'>Artists</span>
        </Link>
      )).to.be.true()
    })

    it('Should render a Link to Search route', () => {
      expect(_wrapper.contains(
        <Link to='/music/search' className='nav-link' activeClassName='route--active'>
          <span className='fa fa-search' />
          <span className='navbar__link-label'>Search</span>
        </Link>
      )).to.be.true()
    })
  })
})
