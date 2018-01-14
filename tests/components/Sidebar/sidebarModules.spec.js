import {default as reducer, TOGGLE_SIDEBAR, toggleSidebar} from 'components/SideBar/modules/sideBar'

describe('SideBar - modules', () => {
  it('toogleSideBar', () => {
    expect(toggleSidebar()).to.deep.equal({
      type: TOGGLE_SIDEBAR
    })
  })

  it('TOGGLE_SIDEBAR', () => {
    const nextState = reducer(undefined, {
      type: TOGGLE_SIDEBAR
    })

    expect(nextState).to.deep.equal({
      isOpen: false,
      mobile: true
    })
  })
})
