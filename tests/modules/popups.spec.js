import {
  POPUP_CLOSE_ALL,
  closeAllPopups,
  default as reducer
} from 'modules/popups'

describe('modules/popups', () => {
  describe('[actions]', () => {
    it('closeAllPopups', () => {
      expect(closeAllPopups()).to.deep.equal({
        type: POPUP_CLOSE_ALL
      })
    })
  })

  describe('[reducer]', () => {
    it('initial state', () => {
      expect(reducer(undefined, {})).to.deep.equal({})
    })

    it('POPUP_CLOSE_ALL', () => {
      const nextState = reducer({
        login: {}
      }, {
        type: POPUP_CLOSE_ALL
      })
      expect(nextState).to.deep.equal({})
    })
  })
})
