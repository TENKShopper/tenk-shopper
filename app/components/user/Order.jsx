import React from 'react'

/* ------ DUMMY DATA ------ */

const order = {
  shipping: 'Two-Day',
  status: 'Processed',
  created: '4/25/17',
  id: '12345673434'
}

const lineitems = [{qty: '1', orderPrice: '15', name: 'Blue Shoes', id: 1},
                   {qty: '2', orderPrice: '10', name: 'Short Sleeve Shirt', id: 2}]

/* ------ COMPONENT ------ */

const Order = ({ user }) => (
  <div>
    <div className="order-detail">
      <legend>Order Detail</legend>
    </div>
    <div>
      <p>Order Date: {order.created}</p>
      <p>Order Number: {order.id}</p>
      <p>Shipping: {order.shipping}</p>
      <p>Order Status: {order.status}</p>
    </div>
    <hr></hr>
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
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Item</th>
            <th></th>
            <th>Merchandise Subtotal</th>
            <th>$35</th>
          </tr>
        </thead>
      </table>
  </div>
)

/* ------ CONTAINER ------ */

import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth })
)(Order)
