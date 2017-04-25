import React from 'react'
import {Link} from 'react-router'

/* ------ COMPONENT ------ */

const Orders = ({ user }) => (
  <table className="table table-striped table-hover">
    <thead>
      <tr>
        <th>Order Date</th>
        <th>Order Number</th>
        <th>Shipping Date</th>
        <th>Tracking Number</th>
      </tr>
    </thead>
    <tbody>
     <tr>
       <td>3/26/2017</td>
       <td><Link to={`/users/${user.id}/orders/1`}>3808439075</Link></td>
       <td>4/1/2017</td>
       <td>1Z849EW10351211223</td>
     </tr>
     <tr>
       <td>4/21/2017</td>
       <td>4610684904</td>
       <td>4/24/2017</td>
       <td>1ZA4562R0360215646</td>
     </tr>
     <tr>
       <td>4/24/2017</td>
       <td>3405265668</td>
       <td>Processing</td>
       <td>1ZA4562R0332128114</td>
     </tr>
   </tbody>
 </table>
)

/* ------ CONTAINER ------ */

import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth })
)(Orders)
