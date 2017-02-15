import React from 'react'
import {Header} from 'components/Header/Header'
import {IndexLink, Link} from 'react-router'
import {shallow} from 'enzyme'

describe('(Component) Header', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Header />)
  })

  it('Renders a welcome message', () => {
    const welcome = _wrapper.find('h1')
    expect(welcome).to.exist
    expect(welcome.contains(
      <IndexLink className='navbar-brand' activeClassName='route--active' to='/'>
        Cloudpolis
      </IndexLink>
    )).to.be.true
    // expect(homeLink.text()).to.match(/Cloudpolis/)
  })

  describe('Navigation links...', () => {
    it('Should render a Link to Artists route', () => {
      expect(_wrapper.contains(
        <Link activeClassName='route--active' to='/music/artists'>
          Artists
        </Link>
      )).to.be.true
    })

    it('Should render a Link to Search route', () => {
      expect(_wrapper.contains(
        <Link activeClassName='route--active' to='/music/search'>
          Search
        </Link>
      )).to.be.true
    })
  })
})
