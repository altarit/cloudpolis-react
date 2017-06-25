import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import AuthForm from './AuthForm'
import './Auth.scss'

export class Auth extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    fetching: PropTypes.bool,
    errorText: PropTypes.string,

    loginPopup: PropTypes.object,
    signupPopup: PropTypes.object,
    userPopup: PropTypes.object,

    resetStatus: PropTypes.func.isRequired,
    hi: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.hi()
  }

  login = (values) => {
    this.props.login(values.username, values.password)
  }

  signup = (values) => {
    this.props.signup(values.username, values.password, values.email)
  }

  render() {
    let errorText = this.props.errorText
    return (
      <ul className='form-inline login dropdown open'>
        {this.props.name ? (
          <div>
            <button className='btn btn-primary auth__username-btn' data-click='dropdown' data-for='userPopup'>
              {this.props.name}
            </button>
          </div>
        ) : (
          <div>
            <button className='btn btn-primary' data-click='dropdown' data-for='loginPopup'>
              Login
            </button>
            <button className='btn btn-primary' data-click='dropdown' data-for='signupPopup'>
              Signup
            </button>
          </div>
        )}
        {this.props.loginPopup ? (
          <div className='dropdown-menu show' data-click='none'>
            <AuthForm onSubmit={this.login} resetStatus={this.props.resetStatus} errorText={errorText} />
          </div>) : null}
        {this.props.signupPopup ? (
          <div className='dropdown-menu show' data-click='none'>
            <AuthForm onSubmit={this.signup} resetStatus={this.props.resetStatus} isreg errorText={errorText} />
          </div>) : null}
        {this.props.userPopup ? (
          <ul className='dropdown-menu show' data-click='none'>
            <li><Link to={`/users/${this.props.name}`}> Profile</Link></li>
            <li><Link className='' onClick={this.props.logout}> Logout</Link></li>
          </ul>
        ) : null}
      </ul>
    )
  }
}

export default Auth
