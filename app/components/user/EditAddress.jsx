import React from 'react'
import {Link} from 'react-router'

/* ------ COMPONENT ------ */

const EditAddress = ({ user, addAddress }) => (
  <div className="col-md-6">
    <form className="form-horizontal" action='' method="POST"
      onSubmit={evt => {
        evt.preventDefault()
        addAddress(user.id, 'shippingAddress', evt.target.firstName.value, evt.target.lastName.value, evt.target.streetAddress.value, evt.target.premise.value, evt.target.administrativeArea.value, evt.target.locality.value, evt.target.postalZipCode.value)
      } }>
      <fieldset>
        <div id="legend">
          <legend className="">Edit Address</legend>
        </div>
        <div className="control-group">
          <label className="control-label" htmlFor="firstName">First Name</label>
          <div className="controls">
            <input type="text" id="firstName" name="firstName" placeholder="" className="input-xlarge"/>
          </div>
        </div>
        <div className="control-group">
          <label className="control-label" htmlFor="lastName">Last Name</label>
          <div className="controls">
            <input type="text" id="lastName" name="lastName" placeholder="" className="input-xlarge"/>
          </div>
        </div>
        <div className="control-group">
          <label className="control-label" htmlFor="streetAddress">Address Line 1</label>
          <div className="controls">
            <input type="text" id="streetAddress" name="streetAddress" placeholder="" className="input-xlarge"/>
            <p className="help-block">Street address, P.O. Box, Company Name, c/o</p>
          </div>
        </div>
        <div className="control-group">
          <label className="control-label" htmlFor="premise">Address Line 2</label>
          <div className="controls">
            <input type="text" id="premise" name="premise" placeholder="" className="input-xlarge"/>
            <p className="help-block">Apartment, Suite, Unit, Floor, etc.</p>
          </div>
        </div>
        <div className="control-group">
          <label className="control-label" htmlFor="administrativeArea">State / Region / Province</label>
          <div className="controls">
            <input type="text" id="administrativeArea" name="administrativeArea" placeholder="" className="input-xlarge"/>
          </div>
        </div>
        <div className="control-group">
          <label className="control-label" htmlFor="locality">City / Town</label>
          <div className="controls">
            <input type="text" id="locality" name="locality" placeholder="" className="input-xlarge"/>
          </div>
        </div>
        <div className="control-group">
          <label className="control-label" htmlFor="postalZipCode">Postal Code</label>
          <div className="controls">
            <input type="password" id="postalZipCode" name="postalZipCode" placeholder="" className="input-xlarge"/>
          </div>
        </div>
        <div className="control-group">
          <div className="controls">
            <button className="btn btn-success">Add New Address</button>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
)

/* ------ CONTAINER ------ */

import {addAddress} from 'APP/app/reducers/users-reducer'
import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {addAddress}
)(EditAddress)
