import {
  TOGGLE_SIDEBAR,
  toggleSidebar,
  default as reducer
} from 'components/Sidebar/modules/sideBar'

describe('SideBar - modules', () => {
  it('toogleSidebar', () => {
    expect(toggleSidebar()).to.deep.equal({
      type: TOGGLE_SIDEBAR
    })
  })

  it('TOGGLE_SIDEBAR', () => {
    const nextState = reducer(undefined, {
      type: TOGGLE_SIDEBAR
    })

    expect(nextState).to.deep.equal({
      isOpen: false
    })
  })
})
