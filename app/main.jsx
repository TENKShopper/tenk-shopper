'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'

import store from './store'

/* ------ Components ------ */

import App from './components/App'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Products from './components/productsFilter'
import User from './components/User'
import Orders from './components/Orders'
import Auth from './components/Login'

render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ App } >
        {/* Update to split Login and Signup into two separate components rendered in Auth */}
        <Route path="/authenticate" component={ Auth } />
        <Route path="/products" component={ Products } />
        <Route path="/users/:userId" component={User}>
          <Route path="/users/:userId/orders" component={Orders} />
          <Route path="/users/:userId/reviews" component={User} />
          <Route path="/users/:userId/addresses" component={User} />
          <Route path="/users/:userId/settings" component={User} />
        </Route>
      </Route>
      <Route path='*' component={ NotFound } />
    </Router>
  </Provider>,
  document.getElementById('main')
)
