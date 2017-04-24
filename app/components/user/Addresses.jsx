import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

function Addresses({ user, logout }) {
  return (
  <div className="addressList">
    <p>
      <Link to={`/users/${user.id}/addresses/editAddress`} className="btn btn-primary btn-lg">Add New Address</Link>
    </p>
    <ul className="addressBox">
      <h3>Default Shipping Address</h3>
        {
          user.shippingAddresses && user.shippingAddresses.map(address => (
            <ul className="vList">
              <li>{address.fullName}</li>
              <li>{address.streetAddress}</li>
              <li>{address.premise}</li>
              <li>{address.administrativeArea}</li>
              <li>{address.locality}</li>
              <li>{address.postalZipCode}</li>
              <li className="action">
                <Link to={`users/${user.id}/addresses/editAddress/`} className="btn btn-primary btn-sm">Edit Address</Link>
              </li>
            </ul>
          ))
        }
    </ul>
  </div>
  )
}

export default connect(
  ({ auth }) => ({ user: auth })
)(Addresses)
