'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'

import store from './store'

/* ------ Components ------ */

import App from './components/App'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Products from './components/productsFilter'
import Users from './components/usersFilter'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ App } >
        <Route path="/login" component={ Login } />
        <Route path="/signup" component={ Login } />
        <Route path="/products" component={ Products } />
        <Route path="/users" component={ Users } />
      </Route>
      <Route path='*' component={ NotFound } />
    </Router>
  </Provider>,
  document.getElementById('main')
)
