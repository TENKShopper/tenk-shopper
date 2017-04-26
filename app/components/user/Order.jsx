import React from 'react'

/* ------ DUMMY DATA ------ */

const lineitems = [{qty: '1', orderPrice: '15', name: 'Blue Shoes', id: 1},
                   {qty: '2', orderPrice: '10', name: 'Short Sleeve Shirt', id: 2}]

/* ------ COMPONENT ------ */

const Order = (props) => {
  const selectedOrder = props.selectedOrder
  return (
    <div>
      <div className="order-detail">
        <legend>Order Detail</legend>
      </div>
      <div>
        <p>Order Date: {selectedOrder.created_at}</p>
        <p>Order Number: {Math.floor(Math.random()*500) + 234820934}</p>
        <p>Shipping: {selectedOrder.shipping}</p>
        <p>Order Status: 'Processing'</p>
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
}

/* ------ CONTAINER ------ */
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    selectedOrder: state.selectedOrder,
    user: state.auth
  }
}

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Order)
