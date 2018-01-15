import React from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'

class CreateLibraryForm extends React.Component {
  static propTypes = {
    errorText: PropTypes.string,

    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <ul className='dropdown-menu show' data-click='none'>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <Field name='name' component='input' type='text' className='form-control' />
          </div>
          <div>{this.props.errorText}</div>
          <div className='btn-group'>
            <button type='submit' className='btn btn-primary'>Send</button>
          </div>
        </ul>
      </form>
    )
  }
}

export default reduxForm({
  form: 'createLibrary'
})(CreateLibraryForm)
