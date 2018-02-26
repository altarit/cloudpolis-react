import React from 'react'
import PropTypes from 'prop-types'

import './Input.scss'

export default class Input extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  timer = null
  nextSubmit = 0

  scheduleReload = (query, delay) => {
    if (this.timer) {
      clearTimeout(this.timer)
    }

    if (delay === 0) {
      this.props.onChange(query)
    } else {
      let now = Date.now()
      let left = this.nextSubmit - now
      if (left <= delay) {
        left = delay
        this.nextSubmit = now + left
      }
      this.timer = setTimeout(this.props.onChange.bind(null, query), left)
    }
  }

  changeFilter = (e) => {
    let delay = this.props.delay || 0
    this.scheduleReload(e.target.value, delay)
  }

  clearFilter = () => {
    this.refs.inputField.value = ''
    this.props.onChange('')
    this.refs.inputField.focus()
  }

  keyPressed = (e) => {
    if (e.key = 'Enter') {
      this.scheduleReload(e.target.value, 0)
    }
  }


  render() {
    return (
        <div className='btn-group form-search input-search-component'>
          <input type='search' className='form-control' ref='inputField'
                 defaultValue={this.props.defaultValue} onKeyPress={this.keyPressed} onChange={this.changeFilter} />
          <span className='fa fa-close input-search-icon' onClick={this.clearFilter} />
        </div>
    )
  }
}
