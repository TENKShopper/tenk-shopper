'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'

import store from './store'

import App from './components/App'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Auth from './components/authenticate/LoginSignup'
import Products from './components/products/ProductsFilter'
import SingleProduct from './components/products/SingleProduct'
import User from './components/user/User'
import Orders from './components/user/Orders'
import Addresses from './components/user/Addresses'
import EditAddress from './components/user/EditAddress'
import Cart from './components/shoppingCart'

import { fetchProducts } from './reducers/products-reducer'
import { fetchSelectedProduct } from './reducers/selectedProduct-reducer'

/* ------ COMPONENT ------ */

const Routes = ({ fetchInitialData }) => (
  <Router history={browserHistory}>
    <Route path="/" component={App} onEnter={fetchInitialData} >
      <IndexRedirect to="/home" />
      <Route path="/home" component={Home} />
      <Route path="/authenticate" component={Auth} />
      <Route path="/products" component={Products} />
      <Route path='/products/:id' component={SingleProduct} onEnter={fetchSelectedProduct} />
      <Route path="/cart" component={Cart} />
      <Route path="/users/:userId" component={User}>
        <Route path="orders" component={Orders} />
        <Route path="reviews" component={User} />
        <Route path="addresses" component={Addresses} />
        <Route path="addresses/editAddress" component={EditAddress} />
        <Route path="settings" component={User} />
      </Route>
    </Route>
    <Route path='*' component={NotFound} />
  </Router>
)

/* ------ CONTAINER ------ */

const mapStateToProps = null

const mapDispatchToProps = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchProducts())
  },
  fetchSelectedProduct: () => {
    dispatch(fetchSelectedProduct())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
