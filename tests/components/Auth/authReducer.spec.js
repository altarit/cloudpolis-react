import * as types from 'components/Auth/modules/authConstants'
import reducer from 'components/Auth/modules/authReducer'

describe('components/Auth - Reducer', () => {
  it('AUTH_RESET', () => {
    const nextState = reducer({
      errorText: 'Wrong password',
      fetching: false
    }, {
      type: types.AUTH_RESET_STATUS
    })
    expect(nextState).to.deep.equal({
      name: undefined
    })
  })

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

  it('AUTH_HI_FAILURE', () => {
    const nextState = reducer(undefined, {
      type: types.AUTH_HI_FAILURE
    })
    expect(nextState).to.deep.equal({
    })
  })

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

  it('AUTH_LOGIN_FAILURE', () => {
    const nextState = reducer(undefined, {
      type: types.AUTH_LOGIN_FAILURE,
      errorText: 'Wrong password.'
    })
    expect(nextState).to.deep.equal({
      fetching: false,
      errorText: 'Wrong password.'
    })
  })

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

  it('AUTH_SIGNUP_FAILURE', () => {
    const nextState = reducer(undefined, {
      type: types.AUTH_SIGNUP_FAILURE,
      errorText: 'Username is not unique.'
    })
    expect(nextState).to.deep.equal({
      errorText: 'Username is not unique.',
      fetching: false
    })
  })

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

  it('AUTH_LOGOUT_FAILURE', () => {
    const nextState = reducer(undefined, {
      type: types.AUTH_LOGOUT_FAILURE,
      errorText: 'Not found'
    })
    expect(nextState).to.deep.equal({
      errorText: 'Not found',
      fetching: false
    })
  })
})
