import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import './Auth.scss'
import AuthForm from './AuthForm'

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
    return (
      <ul className='nav navbar-nav navbar-right login dropdown open'>
        {this.props.name ? (
          <div>
            <button type='button' className='btn btn-primary'
              data-click='dropdown' data-for='userPopup'>
              {this.props.name}
            </button>
          </div>
        ) : (
          <div>
            <button type='button' className='btn btn-primary'
              data-click='dropdown' data-for='loginPopup'>
              Login
            </button>
            <button type='button' className='btn btn-primary'
              data-click='dropdown' data-for='signupPopup'>
              Signup
            </button>
          </div>
        )}
        {this.props.loginPopup ? (
          <div className='dropdown-menu dropdown' data-click='none'>
            <AuthForm onSubmit={this.login} resetStatus={this.props.resetStatus}
              errorText={this.props.errorText} />
          </div>) : null}
        {this.props.signupPopup ? (
          <div className='dropdown-menu dropdown' data-click='none'>
            <AuthForm onSubmit={this.signup} resetStatus={this.props.resetStatus}
              isreg errorText={this.props.errorText} />
          </div>) : null}
        {this.props.userPopup ? (
          <ul className='dropdown-menu dropdown' data-click='none'>
            <li><Link to={`/users/${this.props.name}`}> Profile</Link></li>
            <li><a className='' onClick={this.props.logout}> Logout</a></li>
          </ul>
        ) : null}
      </ul>
    )
  }
}

export default Auth
