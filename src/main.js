import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import createStore from './store/createStore'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'

// Store Initialization
// ------------------------------------
const {store, history} = createStore(window.__INITIAL_STATE__)

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const App = require('./components/App/App').default
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App store={store} routes={routes}></App>
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE
  )
}

// Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) {
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default
      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    render = () => {
      try {
        renderApp()
      } catch (e) {
        console.error(e)
        renderError(e)
      }
    }

    // Setup hot module replacement
    module.hot.accept([
      './components/App/App',
      './routes/index',
    ], () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// Let's Go!
// ------------------------------------
if (!__TEST__) render()
