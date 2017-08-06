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
          <label htmlFor='path'>Path...</label>
          <input name='path' type='text' className='form-control' readOnly defaultValue={this.props.path} />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Name...</label>
          <Field name='name' component='input' type='text' className='form-control' />
        </div>
        <div className='form-group'>
          <label htmlFor='base'>Base path...</label>
          <Field name='base' component='input' type='text' className='form-control' />
        </div>
        <div className='form-group'>
          <label htmlFor='data'>Json...</label>
          <Field name='data' component='textarea' type='text' ref='jsonField' className='form-control' />
        </div>
        <div>{this.props.errorText}</div>
        <div className='btn-group'>
          <button type='submit' className='btn btn-primary'>Send</button>
        </div>
      </form>
    )
  }
}

let form = 'importCollection'
let fields = ['path', 'name', 'base', 'data']
export default reduxForm({
  form, fields
})(ImportCollectionForm)
