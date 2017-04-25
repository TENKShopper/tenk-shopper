import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

/* ----- DUMMY DATA ----- */
const dummyOrder = [{
  product: {
    id: 1,
    name: 'T-Shirt',
    image: 'http://demandware.edgesuite.net/aawj_prd/on/demandware.static/-/Library-Sites-CTShirtsSharedLibrary/default/dw9877fa95/images/plp-tooltip_fit-shirt-extraslim.jpg',
    price: 500,
  },
  quantity: 2,
  totalPrice: 1000,
  id: 12345
}, {
  product: {
    id: 2,
    name: 'Pants',
    image: 'http://www.how-to-draw-funny-cartoons.com/image-files/cartoon-pants-5.gif',
    price: 30,
  },
  quantity: 3,
  totalPrice: 90,
  id: 12346
}]

/* ----- COMPONENT ----- */

const cartComponent = (props) => {
  return (
    <div className="cart-view" >
      <table id="order-table" className="table table-striped table-hover">
        <thead className="table-headers">
          <tr>
          <th className="section-header first-section">Product</th>
          <th className="section-header second-section">Quantity</th>
          <th className="section-header third-section">PRICE</th>
          <th className="section-header forth-section">Total PRICE</th>
          </tr>
        </thead>
        <tbody>
          {renderOrder()}
          <tr className="order-subtotal-price">
            <td className="order-total-price">Subtotal</td>
            <td className="order-total-price">{dummyOrder.totalPrice}</td>
          </tr>
        </tbody>
      </table>
      <div className="button">
        <button className="btn btn-default">CHECKOUT</button>
      </div>
      <div className="subtotal-price">

      </div>
    </div>
  )

  /* ------ HELPER FUNCTIONS ------ */

  function renderOrder() {
    // creates order cell/element from all pending orders
    // product name -> link to individual product package
    // quantity of product
    // price of each unit
    // total price
    return dummyOrder.map(order => (
      <tr key={order.id}>
        <td className ="order-product-detail">
          <div className="product-image">
            <img src = {`${order.product.image}`} />
          </div>
          <div className="product-name">
            <Link to={`/products/${order.product.id}`}>
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
            {order.totalPrice}
        </td>
      </tr>
    ))
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

export default connect(null, null)(cartComponent)
