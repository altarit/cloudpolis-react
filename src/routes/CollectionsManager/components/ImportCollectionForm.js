import React, {PropTypes} from 'react'
import {Field, reduxForm} from 'redux-form'

class ImportCollectionForm extends React.Component {
  static propTypes = {
    errorText: PropTypes.string,

    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name...</label>
          <Field name='name' component='input' type='text' className='form-control' />
        </div>
        <div className='form-group'>
          <label htmlFor='data'>Json...</label>
          <Field name='data' component='textarea' type='text' className='form-control' />
        </div>
        <div>{this.props.errorText}</div>
        <div className='btn-group'>
          <button type='submit' className='btn btn-primary'>Send</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'importCollection'
})(ImportCollectionForm)
