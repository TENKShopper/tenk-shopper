import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

const Addresses = ({ user, logout }) => (
  <div className="addressList">
    <p>
      <Link to={`users/${user.id}/addresses/editAddress`} className="btn btn-primary btn-lg">Add New Address</Link>
    </p>
    <ul className="addressBox">
      <h3>Default Shipping Address</h3>
      <ul className="vList">
        <li>Tina Lam</li>
        <li>123 Tina Lane</li>
        <li>2nd Floor</li>
        <li>Brooklyn</li>
        <li>NY</li>
        <li>11209</li>
        <li className="action">
          <Link to={`users/${user.id}/addresses/editAddress/`} className="btn btn-primary btn-sm">Edit Address</Link>
        </li>
      </ul>
    </ul>
  </div>
)

export default connect(
  ({ auth }) => ({ user: auth })
)(Addresses)
