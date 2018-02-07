import React from 'react'
import {Field, reduxForm} from 'redux-form'

const validate = values => {
  const errors = {}
  if (!values.url) {
    errors.url = 'Required'
  } else if (values.url.length > 15) {
    errors.url = 'Must be 15 characters or less'
  }
  if (!values.user) {
    errors.user = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.user)) {
    errors.user = 'Invalid email address'
  }
  if (!values.ip) {
    errors.ip = 'Required'
  } else if (isNaN(Number(values.ip))) {
    errors.ip = 'Must be a number'
  } else if (Number(values.ip) < 18) {
    errors.ip = 'Sorry, you must be at least 18 years old'
  }
  return errors
}

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched &&
      ((error && <span>{error}</span>) ||
        (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const AccessFiltersForm = props => {
  const {handleSubmit, pristine, reset, submitting} = props
  return (
    <form className='access-filters card card-body' onSubmit={handleSubmit}>
      <Field name="url" type="text" className='form-control' component={renderField} label="Url"/>
      <div>
        <label/>
        <div>
          <label>
            <Field name="exclude-crm" component="input" type="checkbox" value="exclude-crm"/>{' '}
            Exclude CRM
          </label>
        </div>
      </div>
      <Field name="user" type="text" className='form-control' component={renderField} label="User"/>
      <div>
        <label/>
        <div>
          <label>
            <Field name="exclude-user-me" component="input" type="checkbox" value="exclude-user-me"/>{' '}
            Exclude me
          </label>
        </div>
      </div>
      <Field name="ip" type="text" className='form-control' component={renderField} label="Ip"/>
      <div>
        <label/>
        <div>
          <label>
            <Field name="exclude-ip-me" component="input" type="checkbox" value="exclude-ip-me"/>{' '}
            Exclude my IP
          </label>
        </div>
      </div>
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'accessFilters',
  validate
})(AccessFiltersForm)
