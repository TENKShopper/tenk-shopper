'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'

import store from './store'

import App from './components/App'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Products from './components/products/ProductsFilter'
import User from './components/user/User'
import Orders from './components/user/Orders'
import Auth from './components/Login'

import { fetchProducts } from './reducers/products-reducer'

/* ------ COMPONENT ------ */

const Routes = ({ fetchInitialData }) => (
  <Router history={ browserHistory }>
      <Route path="/" component={ App } onEnter={ fetchInitialData } >
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
)

/* ------ CONTAINER ------ */

const mapStateToProps = null

const mapDispatchToProps = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchProducts())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
