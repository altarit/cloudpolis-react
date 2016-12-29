import React, { Component, PropTypes } from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';

import {closeAllPopups, openPopup} from '../modules/popups'

class AppContainer extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  shouldComponentUpdate() {
    return false;
  }

  handleClick = (e) => {
    let target = e.target
    do {
      let dataClick = target.dataset && target.dataset.click
      if (dataClick) {
        switch (dataClick) {
          case 'dropdown':
                return this.props.store.dispatch(openPopup(target.dataset.for, e.pageX, e.pageY))
        }

        return
      }
      target = target.parentNode
    } while (target != null)
    this.props.store.dispatch(closeAllPopups())
  }

  render() {
    const { routes, store } = this.props;

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }} onClick={this.handleClick}>
          <Router history={browserHistory} children={routes}/>
        </div>
      </Provider>
    );
  }
}

export default AppContainer;
