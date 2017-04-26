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
import GuestCheckout from './components/authenticate/GuestCheckout'
import ShoppingCart from './components/ShoppingCart'
import Products from './components/products/AllProducts'
import SingleProduct from './components/products/SingleProduct'
import User from './components/user/User'
import Orders from './components/user/Orders'
import Order from './components/user/Order'
import Addresses from './components/user/Addresses'
import EditAddress from './components/user/EditAddress'
import ReviewOrder from './components/user/ReviewOrder'

import { fetchProducts } from './reducers/products-reducer'
import { fetchSelectedProduct } from './reducers/selectedProduct-reducer'
import { fetchPendingOrder } from './reducers/pendingOrders-reducer'

/* ------ HELPER FUNCTIONS ------ */

const onSelectedProduct = (nextRouterState) => {
  store.dispatch(fetchSelectedProduct(nextRouterState.params.productId))
}

const onShoppingCart = (nextRouterState) => {
  store.dispatch(fetchPendingOrder())
}

/* ------ COMPONENT ------ */

const Routes = ({ fetchInitialData }) => (
  <Router history={browserHistory}>
    <Route path="/" component={App} onEnter={fetchInitialData} >
      <IndexRedirect to="/home" />
      <Route path="/home" component={Home} />
      <Route path="/authenticate" component={Auth} />
      <Route path="/products" component={Products} />
      <Route path="/products/:productId" component={SingleProduct} onEnter={onSelectedProduct} />
      <Route path="/shoppingCart" component={ShoppingCart} onEnter={onShoppingCart}/>
      <Route path="/users/:userId" component={User}>
        <Route path="orders" component={Orders} />
        <Route path="orders/1" component={ Order } />
        <Route path="reviews" component={User} />
        <Route path="addresses" component={Addresses} />
        <Route path="addresses/edit" component={EditAddress} />
        <Route path="settings" component={User} />
      </Route>
      <Route path="/checkout/login" component={GuestCheckout} />
      <Route path="/checkout/reviewOrder" component={ReviewOrder} />
    </Route>
    <Route path='*' component={NotFound} />
  </Router>
)

      // {/* <Route path='/products/:id' component = {SingleProduct} /> */}
/* ------ CONTAINER ------ */

const mapStateToProps = null

const mapDispatchToProps = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchProducts())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
