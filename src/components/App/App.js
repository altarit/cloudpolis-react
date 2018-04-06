import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {resizedWindow} from '../SideBar/modules/sideBar'
import {closeAllPopups, openPopup} from '../../modules/popups'
import Sidebar from '../SideBar'
import BottomBar from '../BottomBar'
import Modals from '../Modals'
import DragDrop from '../DragDrop'
import Header from '../Header'
import './App.scss'
import '../../styles/main.scss'

class App extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired,
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.currentState = props.store.getState().sidebar
    this.state = this.currentState
  }

  resizeWindow = () => {
    this.props.store.dispatch(resizedWindow())
  }

  changedSideBar = () => {
    const previousState = this.currentState
    const state = this.currentState = this.props.store.getState().sidebar
    if (previousState !== state && (previousState.isOpen !== state.isOpen || previousState.mobile !== state.mobile)) {
      this.setState(state)
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeWindow)
    this.props.store.subscribe(this.changedSideBar)
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
    console.log(`App.render`)
    return (
      <div style={{height: '100%'}} onClick={this.handleClick}>
        <div className={'content__out' + (this.state.isOpen ? ' content__out_shifted' : '')}>
          <Header sidebar={this.state.isOpen} mobile={this.state.mobile} />
          <div className='core-layout__viewport'>
            {this.props.routes}
          </div>
        </div>
        <div className={'sidebar' + (!this.state.isOpen ? ' sidebar--open' : '')}>
          <Sidebar />
        </div>
        <BottomBar />
        <Modals />
        <DragDrop />
      </div>
    )
  }
}

export default App
