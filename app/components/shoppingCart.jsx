import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { checkoutOrder } from '../reducers/pendingOrders-reducer'

/* ----- DUMMY DATA ----- */
const dummyOrder = [{
  product: {
    id: 1,
    name: 'T-Shirt',
    image: 'http://demandware.edgesuite.net/aawj_prd/on/demandware.static/-/Library-Sites-CTShirtsSharedLibrary/default/dw9877fa95/images/plp-tooltip_fit-shirt-extraslim.jpg',
    price: 500,
  },
  quantity: 2,
  orderPrice: 1000,
  id: 12345
}, {
  product: {
    id: 2,
    name: 'Pants',
    image: 'http://www.how-to-draw-funny-cartoons.com/image-files/cartoon-pants-5.gif',
    price: 30,
  },
  quantity: 3,
  orderPrice: 90,
  id: 12346
}]

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
    return checkoutOrder(pendingOrders, {shipping: 'International'})
  }
}
/* ----- CONTAINER ----- */

const mapStateToProps = (state) => ({
  pendingOrders: state.cart
})

const mapDispatchToProps = (dispatch) => ({
  // needs to dispatch a function that can bulk add all line items in cart to users
  checkoutOrder: (pendingOrders, orderDetail) => dispatch(checkoutOrder(pendingOrders, orderDetail))
})

export default connect(mapStateToProps, mapDispatchToProps)(cartComponent)
