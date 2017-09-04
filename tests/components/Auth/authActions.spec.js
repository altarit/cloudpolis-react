import {apiLink} from 'modules/formatUtils'
import * as types from 'components/Auth/modules/authConstants'
import * as actions from 'components/Auth/modules/authActions'
import * as popups from 'modules/popups'

const mockStore = configureStore(middlewares)

describe('components/Auth - Actions', () => {
  it('reset', () => {
    expect(actions.resetStatus()).to.deep.equal({
      type: types.AUTH_RESET_STATUS
    })
  })

  describe('hi', () => {
    afterEach(fmock.restore)

    it('Successful auth', () => {
      fmock.get(apiLink('/hi/'), {
        body: {data: 'Aj'}
      })

      const store = mockStore()
      const expectedActions = [
        {type: types.AUTH_HI_REQUEST},
        {type: types.AUTH_HI_SUCCESS, name: 'Aj'}
      ]

      return store.dispatch(actions.hi())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
  })

  describe('login', () => {
    afterEach(fmock.restore)

    it('Successful login', () => {
      const username = 'derpy'
      const password = '1234'

      fmock.post((url, opt) => {
        const body = JSON.parse(opt.body)
        return url === apiLink('/login/') &&
          body.username === username &&
          body.password === password &&
          body.isreg === undefined
      }, {
        body: {data: 'Aj'},
        status: 200
      })

      const store = mockStore()
      const expectedActions = [
        {type: types.AUTH_LOGIN_REQUEST, name: username, pass: password},
        {type: types.AUTH_LOGIN_SUCCESS, name: 'Aj'},
        {type: popups.POPUP_CLOSE_ALL}
      ]

      return store.dispatch(actions.login(username, password))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })

    it('Failed login - wrong password', () => {
      const username = 'derpy'
      const password = '12345'

      fmock.post((url, opt) => {
        const body = JSON.parse(opt.body)
        return url === apiLink('/login/') &&
          body.username === username &&
          body.password === password &&
          body.isreg === undefined
      }, {
        body: {message: 'Wrong password', status: 403},
        status: 403
      })

      const store = mockStore()
      const expectedActions = [
        {type: types.AUTH_LOGIN_REQUEST, name: username, pass: password},
        {type: types.AUTH_LOGIN_FAILURE, errorText: 'Wrong password'}
      ]

      return store.dispatch(actions.login(username, password))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
  })

  describe('signup ', () => {
    afterEach(fmock.restore)

    it('Successful registration', () => {
      const username = 'derpy'
      const password = '1234'
      const email = 'derpy@mail.equ'

      fmock.post((url, opt) => {
        const body = JSON.parse(opt.body)
        return url === apiLink('/login/') &&
          body.username === username &&
          body.password === password &&
          body.email === email &&
          body.isreg === true
      }, {
        body: {data: username},
        status: 200
      })

      const store = mockStore()
      const expectedActions = [
        {type: types.AUTH_SIGNUP_REQUEST, name: username, pass: password, mail: email},
        {type: types.AUTH_SIGNUP_SUCCESS, name: username},
        {type: popups.POPUP_CLOSE_ALL}
      ]

      return store.dispatch(actions.signup(username, password, email))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
  })

  describe('logout', () => {
    afterEach(fmock.restore)

    it('Successful logout', () => {
      fmock.post(apiLink('/logout/'), {
        body: {result: true}
      })

      const store = mockStore()
      const expectedActions = [
        {type: types.AUTH_LOGOUT_REQUEST},
        {type: types.AUTH_LOGOUT_SUCCESS},
        {type: popups.POPUP_CLOSE_ALL}
      ]

      return store.dispatch(actions.logout())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
  })
})
