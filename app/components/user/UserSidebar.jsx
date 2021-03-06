import React from 'react'
import {Link} from 'react-router'

/* ------ COMPONENT ------ */

const UserSidebar = ({ user }) => (
  <div>
    <div className="col-md-3 list-group">
      <Link to={`/users/${user.id}/orders`} className="list-group-item active">Orders</Link>
      <Link to={`/users/${user.id}/addresses`} className="list-group-item">Addresses</Link>
      <Link to={`/users/${user.id}/payments`} className="list-group-item">Payment Methods</Link>
      <Link to={`/users/${user.id}/reviews`} className="list-group-item">Reviews</Link>
      <Link to={`/users/${user.id}/settings`} className="list-group-item"> Account Settings</Link>
    </div>
    <div className="vertical-line"></div>
  </div>
)

/* ------ CONTAINER ------ */

import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth })
)(UserSidebar)
