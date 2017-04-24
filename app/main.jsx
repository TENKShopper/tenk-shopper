'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Auth from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'

import App from './App'
<<<<<<< HEAD
import User from './components/User'
import Orders from './components/Orders'
=======
>>>>>>> 7a0a324f281e5855307209fdd01c89bca5d0f9d5

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/authenticate" component={Auth} />
<<<<<<< HEAD
        <Route path="/users/:userId" component={User}>
          <Route path="/users/:userId/orders" component={Orders} />
          <Route path="/users/:userId/reviews" component={User} />
          <Route path="/users/:userId/addresses" component={User} />
          <Route path="/users/:userId/settings" component={User} />
          <IndexRedirect path="/users/:userId/orders" />
        </Route>
=======
>>>>>>> 7a0a324f281e5855307209fdd01c89bca5d0f9d5
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
