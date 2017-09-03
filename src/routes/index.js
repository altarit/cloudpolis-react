// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import CounterRoute from './Counter'
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

/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    CounterRoute(store),
    ThirdRoute,
    Artists(store),
    Artist(store),
    Search(store),
    Admin(store),
    Users(store),
    UserDetails(store),
    AccessLog(store),
    Libraries(store),
    Library(store),
  ]
})

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
