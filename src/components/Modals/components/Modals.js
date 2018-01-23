import React from 'react'
import PropTypes from 'prop-types'

import './Modals.scss'

export class Modals extends React.Component {
  static propTypes = {
    confirmationPopup: PropTypes.object,
    shade: PropTypes.object,

    dispatch: PropTypes.func.isRequired
  }

  executeConfirmationAction = () => {
    this.props.dispatch(this.props.confirmationPopup.action)
  }

  render() {
    return (
      <nav className='modals'>
        {this.props.shade ? (
          <div className="modals-shade"></div>
        ) : null}
        {this.props.confirmationPopup ? (
          <div className='dropdown show dropdown-menu modal-confirmation' data-click='none'>
            <div className="modal-text">
              {this.props.confirmationPopup.title}
            </div>
            <div className="modal-buttons">
              <button type='button' className='btn btn-outline-secondary' data-click='closeall'>
                {this.props.confirmationPopup.rejectText}
              </button>
              <button type='submit' className='btn btn-outline-secondary' onClick={this.executeConfirmationAction}>
                {this.props.confirmationPopup.confirmText}
              </button>
            </div>
          </div>

        ) : null}
      </nav>
    )
  }
}

export default Modals
