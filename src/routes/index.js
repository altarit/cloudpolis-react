import React, {Component} from 'react'
import {Route, Link, Router} from 'react-router-dom'
import Loadable from 'react-loadable'

import {injectReducer} from "../store/reducers"
import Home from './Home'
import ThirdRoute from './Third'
import Artists from './Artists'
import Artist from './Artist'
import Search from './Search'
import Admin from './Admin'
import Users from './Users'
import UserDetails from './UserDetails'
import AccessLog from './AccessLog'
import Libraries from './Libraries'
import Library from './Library'
import Playlists from './Playlists'

export const createRoutes = (store) => [
  Home,
  Artists,
  Artist,
  Search(store),
  Admin(store),
  Users(store),
  UserDetails(store),
  AccessLog(store),
  Libraries(store),
  Library(store),
  Playlists(store),
].map(component => createLoadableComponent(component, store))

function createLoadableComponent(lazyComponent, store) {
  if (lazyComponent.component) {
    return <Route key={lazyComponent.path} exact path={lazyComponent.path} component={lazyComponent.component}/>
  }

  const loadable = Loadable({
    loader: () => {
      return lazyComponent.getComponent()
        .then(modules => {
          if (modules[1]) {
            injectReducer(store, {key: lazyComponent.name, reducer: modules[1].default})
          }
          return modules[0]
        })
    },
    loading() {
      return <div>Loading...</div>
    }
  })

  return (
    <Route key={lazyComponent.path} exact path={lazyComponent.path} component={loadable}/>
  )
}


/*  Note: childRoutes can be chunked or otherwise loaded programmatically
 using getChildRoutes with the following signature:

 getChildRoutes (location, cb) {
   require.ensure([], (require) => {
     cb(null, [
         // Remove imports!
         require('./Counter').default(store)
       ]);
     });
 };

 However, this is not necessary for code-splitting! It simply provides
 an API for async route definitions. Your code splitting should occur
 inside the route `getComponent` function, since it is only invoked
 when the route exists and matches.
 */

export default createRoutes
