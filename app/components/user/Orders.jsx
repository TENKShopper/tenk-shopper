import React from 'react'
import {Link} from 'react-router'

/* ------ COMPONENT ------ */

const Orders = ({ user, orders }) => (
  <table className="table table-striped table-hover">
    <thead>
      <tr>
        <th>Order Date</th>
        <th>Order Number</th>
        <th>Shipping Method</th>
        <th>Tracking Number</th>
      </tr>
    </thead>
    <tbody>
      {
        orders && orders.map(order => (
          <tr key={order.id}>
            <td>{order.created_at.slice(0, 10)}</td>
            <td><Link to={`/users/${user.id}/orders/${order.id}`}>{Math.floor(Math.random()*500) + 234820934}</Link></td>
            <td>{order.created_at.slice(0, 10)}</td>
            <td>1Z849EW10351211223</td>
          </tr>
          ))
      }
   </tbody>
 </table>
)

/* ------ CONTAINER ------ */

import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
  orders: state.orders,
  user: state.auth
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
