import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { checkoutOrder } from '../reducers/pendingOrders-reducer'

/* ----- DUMMY DATA ----- */
const dummyAddress = {
  id: 1,
  country: 'USA',
  firstName: 'Kido Kido',
  lastName: 'Kido',
  administrativeArea: 'NY',
  locality: 'NYC',
  postalZipCode: '12345',
  streetAddress: '123 Kido Lane'
}

/* ----- COMPONENT ----- */

const cartComponent = ({checkoutOrder, pendingOrders}) => {
  return (
    <div className="cart-view" >
      <table id="order-table" className="table table-striped table-hover">
        <thead className="table-headers">
          <tr>
          <th className="section-header first-section" colSpan="2">Product</th>
          <th className="section-header second-section">Quantity</th>
          <th className="section-header third-section">Price</th>
          <th className="section-header forth-section">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {renderOrder()}
          <tr className="order-subtotal-price">
            <td colSpan="3"/>
            <td className="order-subtotal">Subtotal</td>
            <td className="order-subtotal-price">{findSubTotal()}</td>
          </tr>
          <tr>
            <td colSpan="4"/>
            <td>
              <button className="btn btn-default" id="cartCheckout" onClick={checkout} >CHECKOUT</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )

  /* ------ HELPER FUNCTIONS ------ */

  function renderOrder() {
    // creates order cell/element from all pending orders
    // product name -> link to individual product package
    // quantity of product
    // price of each unit
    // total price
    return pendingOrders.map((order, i) => (
      <tr key={i} className="order-product">
        <td className ="order-product-image">
          <div className="product-image">
            <img className="media-object img-circle product-list-photo" src={`${order.product.photos[0]}`} />
          </div>
        </td>
        <td>
          <div className="product-detail">
            <Link style={{textDecoration: 'none'}} to={`/products/${order.product.id}`}>
              {order.product.name}
            </Link>
          </div>
        </td>
        <td className ="order-product-quantity">
          <div className="product-quantity">
            {order.quantity}
            {/* REMOVE BUTTON? */}
          </div>
        </td>
        <td className ="order-product-price">
            {order.product.price}
        </td>
        <td className ="order-total-price">
            {order.orderPrice}
        </td>
      </tr>
    ))
  }

  function findSubTotal() {
    return pendingOrders.reduce((total, order) => total + order.orderPrice, 0)
  }

  function checkout(event) {
    return checkoutOrder(pendingOrders, {shipping: 'International'}, dummyAddress, dummyAddress)
  }
}
/* ----- CONTAINER ----- */

const mapStateToProps = (state) => ({
  pendingOrders: state.cart
})

const mapDispatchToProps = (dispatch) => ({
  // needs to dispatch a function that can bulk add all line items in cart to users
  checkoutOrder: (pendingOrders, orderDetail, shippingAddress, billingAddress) => dispatch(checkoutOrder(pendingOrders, orderDetail, shippingAddress, billingAddress))
})

export default connect(mapStateToProps, mapDispatchToProps)(cartComponent)
