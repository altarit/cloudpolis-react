import React from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'

let form = 'createCompilationsBulk'
let fields = ['path', 'base', 'data']

class CreateCompilationsBulkForm extends React.Component {
  static propTypes = {
    errorText: PropTypes.string,
    library: PropTypes.string,

    handleSubmit: PropTypes.func.isRequired,
    calculateBase: PropTypes.func.isRequired,
  }

  calculateBase = (e) => {
    e.preventDefault()
    this.props.calculateBase(form, this.refs.jsonField.value.replace(/\\/g, '/'))
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='path'>Library...</label>
          <input name='path' type='text' className='form-control' readOnly defaultValue={this.props.library} />
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
        <div className='btn-group' />
        <div className='btn-group' />
        <div className='btn-group'>
          <button className='btn btn-primary' onClick={this.calculateBase}>Calculate Base</button>
          <button type='submit' className='btn btn-primary'>Send</button>
          <button className='btn btn-primary' data-click='closeall'>Cancel</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form, fields
})(CreateCompilationsBulkForm)
