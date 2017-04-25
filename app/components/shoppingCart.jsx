import React, { Component } from 'react'
import { connect } from 'react-redux'

/* ----- DUMMY DATA ----- */

/* ----- COMPONENT ----- */

const cartComponent = (props) => {
  return (
    <div className="cart-view" >
      <div className="col-md-3">
      </div>
      <div className="col-md-9">
      </div>
    </div>
  )

  /* ------ HELPER FUNCTIONS ------ */

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

const mapStateToProps = (state) => ({
  // user shipping address and billing address
  // pendingOrders: state.pendingOrders
})

const mapDispatchToProps = (dispatch) => {
  // needs to dispatch a function that can bulk add all line items in cart to users
}

export default connect(mapStateToProps, mapDispatchToProps)(cartComponent)
