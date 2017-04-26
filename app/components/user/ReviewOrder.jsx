import React from 'react'
import Addresses from './Addresses'

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

const ReviewOrder = ({ user }) => {
  console.log('user in review order', user)
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
      </div>
    </div>
  )
}

/* ------ CONTAINER ------ */

import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth })
)(ReviewOrder)
