import * as types from 'components/Auth/modules/authConstants'
import reducer from 'components/Auth/modules/authReducer'

describe('components/Auth - Reducer', () => {
  it('AUTH_HI_REQUEST', () => {
    const nextState = reducer(undefined, {
      type: types.AUTH_HI_REQUEST
    })
    expect(nextState).to.deep.equal({})
  })

  it('AUTH_HI_SUCCESS', () => {
    const nextState = reducer(undefined, {
      type: types.AUTH_HI_SUCCESS,
      name: 'Aj'
    })
    expect(nextState).to.deep.equal({
      name: 'Aj'
    })
  })

  it('AUTH_HI_FAILURE')

  it('AUTH_LOGIN_REQUEST', () => {
    const nextState = reducer(undefined, {
      type: types.AUTH_LOGIN_REQUEST
    })
    expect(nextState).to.deep.equal({
      fetching: true
    })
  })

  it('AUTH_LOGIN_SUCCESS', () => {
    const nextState = reducer(undefined, {
      type: types.AUTH_LOGIN_SUCCESS,
      name: 'Aj'
    })
    expect(nextState).to.deep.equal({
      name: 'Aj',
      fetching: false
    })
  })

  it('AUTH_LOGIN_FAILURE')

  it('AUTH_SIGNUP_REQUEST', () => {
    const nextState = reducer(undefined, {
      type: types.AUTH_SIGNUP_REQUEST
    })
    expect(nextState).to.deep.equal({
      fetching: true
    })
  })

  it('AUTH_SIGNUP_SUCCESS', () => {
    const nextState = reducer(undefined, {
      type: types.AUTH_SIGNUP_SUCCESS,
      name: 'Aj'
    })
    expect(nextState).to.deep.equal({
      name: 'Aj',
      fetching: false
    })
  })

  it('AUTH_SIGNUP_FAILURE')

  it('AUTH_LOGOUT_REQUEST', () => {
    const nextState = reducer(undefined, {
      type: types.AUTH_LOGOUT_REQUEST
    })
    expect(nextState).to.deep.equal({
      fetching: true
    })
  })

  it('AUTH_LOGOUT_SUCCESS', () => {
    const nextState = reducer(undefined, {
      type: types.AUTH_LOGOUT_SUCCESS
    })
    expect(nextState).to.deep.equal({
      name: undefined,
      fetching: false
    })
  })

  it('AUTH_LOGOUT_FAILURE')
})
