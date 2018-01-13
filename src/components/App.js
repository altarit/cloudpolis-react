import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Link, Router} from 'react-router-dom'
import Loadable from 'react-loadable'

import {resizedWindow} from './SideBar/modules/sideBar'
import {injectReducer} from '../store/reducers'
import CoreLayout from '../layouts/CoreLayout'

import {closeAllPopups, openPopup} from '../modules/popups'
import Home from '../routes/Third/components/Third'

class App extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

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


  lazy = (lazyComponent) => {
    const loadable = Loadable({
      loader: () => {
        return lazyComponent.getComponent()
          .then(modules => {
            injectReducer(this.props.store, {key: lazyComponent.name, reducer: modules[1].default})
            return modules[0]
          })
      },
      loading() {
        return <div>Loading...</div>
      }
    })

    return (
      <Route exact path={lazyComponent.path} component={loadable}/>
    )
  }

  render() {
    // return (
    //   <div style={{height: '100%'}} onClick={this.handleClick}>
    //     <Route exact path="/" component={Home}/>
    //     {this.lazy(Artists)}
    //   </div>
    //

    return (
      <div style={{height: '100%'}} onClick={this.handleClick}>
        <CoreLayout children={(<Home/>)}/>
      </div>
    )
  }
}

export default App
