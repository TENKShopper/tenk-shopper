import React from 'react'
import {connect} from 'react-redux'

const Orders = (props) => (
  <table className="table table-striped table-hover">
    <thead>
      <tr>
        <th>#</th>
        <th>Order Number</th>
        <th>Shipping Method</th>
        <th>Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
     <tr>
       <td>1</td>
       <td>123456</td>
       <td>Two-Day</td>
       <td>3/26/2017</td>
       <td>Delivered</td>
     </tr>
     <tr>
       <td>2</td>
       <td>123678</td>
       <td>Standard</td>
       <td>4/21/2017</td>
       <td>Shipped</td>
     </tr>
     <tr>
       <td>3</td>
       <td>123790</td>
       <td>International</td>
       <td>4/24/2017</td>
       <td>Processed</td>
     </tr>
   </tbody>
 </table>
)

export default connect(
)(Orders)
