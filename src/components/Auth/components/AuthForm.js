import React from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'

class AuthForm extends React.Component {
  static propTypes = {
    isreg: PropTypes.bool,
    errorText: PropTypes.string,

    resetStatus: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  componentWillMount = () => {
    this.props.resetStatus()
  }

  render() {
    return (
      <form className='login-form' onSubmit={this.props.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <Field name='username' component='input' type='text' className='form-control' />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <Field name='password' component='input' type='password' className='form-control' />
        </div>
        {this.props.isreg ? (
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <Field name='email' component='input' type='email' className='form-control' />
          </div>
        ) : null}
        <div>{this.props.errorText}</div>
        <div className='btn-group'>
          <button type='submit' className='btn btn-outline-secondary mr-2'>Send</button>
        </div>
        <div className='btn-group'>
          <button type='button' className='btn btn-outline-secondary' data-click='closeall'>Cancel</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'login'
})(AuthForm)
