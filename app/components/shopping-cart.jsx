import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProductItem from './ProductItem'
import { createPendingOrder } from '../reducers/pendingOrder-reducer-temp'
import { addAddress } from '../reducers/users-reducer-temp'

/* ----- DUMMY DATA ----- */

const fakeOrder = {
  Product: 'Bell Bottom Pants',
  Quantity: 1,
  Price: 10000,
}
const fakeAddress = {
  country: 'US',
  firstName: 'Kido',
  lastName: 'Kido',
  administrativeArea: 'NY',
  locality: 'NY',
  postalZipCode: '123',
  streetAddress: '25 Senate Pl'
}

/* ----- COMPONENT ----- */

const cartComponent = (props) => {
  return (
    <div className="cart-view" >
      <div className="col-md-3">
      </div>
      <div className="col-md-9">
        <button onClick={addToCart}>ADD TO CART</button>
        <button onClick={addShippingAddress}>ADD ADDRESS</button>
      </div>
    </div>
  )

  /* ------ HELPER FUNCTIONS ------ */

  function addToCart() {
    props.createPendingOrder(fakeOrder)
  }

  function addShippingAddress() {
    props.createShippingAddress(1, fakeAddress)
  }

  function renderOrder(newOrder) {
    // creates order cell/element from all pending orders
    // product name -> link to individual product package
    // quantity of product
    // price of each unit
    // total price
  }

  function checkoutOrder(event) {
    // make axios put request to change order status to complete
    // added completed order to user order history
  }
}
/* ----- CONTAINER ----- */

// TODO: revisit what state to pass to props
const mapStateToProps = (state) => ({
  pendingOrders: state.pendingOrders
  // user shipping address and billing address
})

const mapDispatchToProps = (dispatch) => {
  return {
    createPendingOrder: (newOrder) => dispatch(createPendingOrder(newOrder)),
    createShippingAddress: (userId, newAddress) => dispatch(addAddress(userId, 'shippingAddress', newAddress))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(cartComponent)
