import React from 'react'
import Addresses from './Addresses'
import { Link } from 'react-router'
import { checkoutOrder } from '../../reducers/pendingOrders-reducer'

/* ------ DUMMY DATA ------ */

const order = {
  shipping: 'Two-Day',
  status: 'Processed',
  created: '4/25/17',
  id: '12345673434'
}

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

const lineitems = [{qty: '1', orderPrice: '15', name: 'Blue Shoes', id: 1},
                   {qty: '2', orderPrice: '10', name: 'Short Sleeve Shirt', id: 2}]

/* ------ COMPONENT ------ */

const ReviewOrder = ({ user, checkoutOrder, pendingOrders }) => {

  function checkout(event) {
    return checkoutOrder(pendingOrders, {shipping: 'International'}, dummyAddress, dummyAddress)
  }

  return (
    <div>
      <div className="review-order-detail">
        <legend>Order Detail</legend>
      </div>
      <div className="review-order-detail">
        <p>Order Date: {order.created}</p>
        <p>Order Number: {order.id}</p>
        <hr></hr>
      </div>
      <div className="review-order-detail">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Amount</th>
            </tr>
          </thead>
          {
            lineitems && lineitems.map(lineItem => (
              <tbody key={lineItem.id}>
                <tr>
                  <td>{lineItem.name}</td>
                  <td>{lineItem.orderPrice}</td>
                  <td>{lineItem.qty}</td>
                  <td>{lineItem.orderPrice * lineItem.qty}</td>
                </tr>
              </tbody>
            ))
          }
        </table>
        <hr></hr>
      </div>
      <div className="review-order-detail">
        {user && <Addresses user={user} />}
        <hr></hr>
      </div>
      <div className="pull-right" id="submit-order-btn">
        <Link to='/'>
          <button className="btn btn-lg btn-success" onClick={checkout}>PLACE ORDER</button>
        </Link>
      </div>
    </div>
  )
}

/* ------ CONTAINER ------ */

import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
  pendingOrders: state.cart,
  user: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  // needs to dispatch a function that can bulk add all line items in cart to users
  checkoutOrder: (pendingOrders, orderDetail, shippingAddress, billingAddress) => dispatch(checkoutOrder(pendingOrders, orderDetail, shippingAddress, billingAddress))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewOrder)
