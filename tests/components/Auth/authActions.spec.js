import {apiLink} from 'modules/formatUtils'
import * as types from 'components/Auth/modules/authConstants'
import * as actions from 'components/Auth/modules/authActions'

const mockStore = configureStore(middlewares)

describe('components/Auth - Actions', () => {
  describe('authHi', () => {
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

      return store.dispatch(actions.authHi())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
  })

  describe('authLogin', () => {
    afterEach(fmock.restore)

    it('Successful login', () => {
      const username = 'derpy'
      const password = '1234'

      fmock.post((url, opt) => {
        const body = JSON.parse(opt.body)
        return url === apiLink('/login/') &&
          body.username === username &&
          body.password === password &&
          body.isReg === undefined
      }, {
        body: {data: 'Aj'},
        status: 200
      })

      const store = mockStore()
      const expectedActions = [
        {type: types.AUTH_LOGIN_REQUEST, name: username, pass: password},
        {type: types.AUTH_LOGIN_SUCCESS, name: 'Aj'}
      ]

      return store.dispatch(actions.authLogin(username, password))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
  })

  describe('authSignup ', () => {
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
          body.isReg === true
      }, {
        body: {data: username},
        status: 200
      })

      const store = mockStore()
      const expectedActions = [
        {type: types.AUTH_SIGNUP_REQUEST, name: username, pass: password, mail: email},
        {type: types.AUTH_SIGNUP_SUCCESS, name: username}
      ]

      return store.dispatch(actions.authSignup(username, password, email))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
  })

  describe('authLogout', () => {
    afterEach(fmock.restore)

    it('Successful logout', () => {
      fmock.post(apiLink('/logout/'), {
        body: {result: true}
      })

      const store = mockStore()
      const expectedActions = [
        {type: types.AUTH_LOGOUT_REQUEST},
        {type: types.AUTH_LOGOUT_SUCCESS}
      ]

      return store.dispatch(actions.authLogout())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
  })
})
