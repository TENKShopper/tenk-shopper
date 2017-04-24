import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

const EditAddress = ({ user, logout }) => (
  <div className="col-md-6">
    <form className="form-horizontal" action='' method="POST"
      onSubmit={evt => {
        evt.preventDefault()
      } }>
      <fieldset>
        <div id="legend">
          <legend className="">Edit Address</legend>
        </div>
        <div className="control-group">
          <label className="control-label" htmlFor="fullName">Full Name</label>
          <div className="controls">
            <input type="text" id="fullName" name="fullName" placeholder="" className="input-xlarge"/>
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

export default connect(
  ({ auth }) => ({ user: auth })
)(EditAddress)
