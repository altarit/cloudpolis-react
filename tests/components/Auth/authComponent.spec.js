// import {apiLink} from 'modules/formatUtils'
// import * as types from 'components/Auth/modules/authConstants'
// import * as actions from 'components/Auth/modules/authActions'

import React from 'react'
import {shallow} from 'enzyme'

import Auth from 'components/Auth/components/Auth'

// const mockStore = configureStore(middlewares)

function setup() {
  const props = {}

  const enzymeWrapper = shallow(<Auth {...props} />)
  return {
    props,
    enzymeWrapper
  }
}

describe('components/Auth - Component', () => {
  it('There is auth component', () => {
    const {enzymeWrapper} = setup()
    expect(enzymeWrapper.find('ul').hasClass('login')).to.be.true()
  })
})
