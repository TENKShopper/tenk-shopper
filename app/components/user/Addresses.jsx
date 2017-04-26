import React from 'react'
import {Link} from 'react-router'

/* ------ COMPONENT ------ */

const Addresses = ({ user }) => (
  <div className="addressList">
    <p>
      <Link to={`/users/${user.id}/addresses/edit`} className="btn btn-primary btn-lg">Add New Address</Link>
    </p>
    <ul className="addressBox">
      <h3>Default Shipping Address</h3>
        {
          user.shippingAddresses && user.shippingAddresses.map(address => (
            <ul className="vList" key={address.id}>
              <li>{address.fullName}</li>
              <li>{address.streetAddress}</li>
              <li>{address.premise}</li>
              <li>{address.administrativeArea}</li>
              <li>{address.locality}</li>
              <li>{address.postalZipCode}</li>
              <li className="action">
                <Link to={`users/${user.id}/addresses/edit/`} className="btn btn-primary btn-sm">Edit Address</Link>
              </li>
            </ul>
          ))
        }
    </ul>
  </div>
)

/* ------ CONTAINER ------ */

import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth })
)(Addresses)
