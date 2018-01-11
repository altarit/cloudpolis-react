import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {BrowserRouter, Router} from 'react-router-dom'
import {Provider} from 'react-redux'

import {resizedWindow} from './SideBar/modules/sideBar'

import {closeAllPopups, openPopup} from '../modules/popups'

class AppContainer extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  shouldComponentUpdate() {
    return false
  }

  resizeWindow = () => {
    this.props.store.dispatch(resizedWindow())
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeWindow)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeWindow)
  }

  handleClick = (e) => {
    let target = e.target
    do {
      let dataClick = target.dataset && target.dataset.click
      if (dataClick) {
        switch (dataClick) {
          case 'dropdown':
            return this.props.store.dispatch(openPopup(
              target.dataset.for,
              target.dataset.from,
              e.clientX, e.clientY,
              window.innerWidth - e.clientX, window.innerHeight - e.clientY))
          case 'closeall':
            return this.props.store.dispatch(closeAllPopups())
        }

        return
      }
      target = target.parentNode
    } while (target != null)
    this.props.store.dispatch(closeAllPopups())
  }

  render() {
    const {routes, store} = this.props

    return (
      <Provider store={store}>
        <div style={{height: '100%'}} onClick={this.handleClick}>
          <BrowserRouter children={routes} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
