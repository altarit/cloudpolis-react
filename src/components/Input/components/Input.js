import React from 'react'
import PropTypes from 'prop-types'

import './Input.scss'

export default class Input extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  changeFilter = (e) => {
    console.log(e)
    console.log(e.target)
    console.log(e.target.value)
    this.props.onChange(e.target.value)
  }

  clearFilter = () => {
    this.refs.inputField.value = ''
    this.props.onChange('')
    this.refs.inputField.focus()
  }

  render() {
    return (
        <div className='btn-group form-search input-search-component'>
          <input type='search' className='form-control'
                 defaultValue={this.props.defaultValue} onChange={this.changeFilter} ref='inputField' />
          <span className='fa fa-close input-search-icon' onClick={this.clearFilter} />
        </div>
    )
  }
}
