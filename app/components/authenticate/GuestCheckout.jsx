import React from 'react'
import Login from './Login'
import { browserHistory } from 'react-router'

/* ------ COMPONENT ------ */

const GuestCheckout = ({ login, signup }) => (
  <div>
    <Login />
    <div className="vertical-line"></div>
      <div className="col-md-6" id="signup-comp">
        <form className="form-horizontal" action='' method="POST"
          onSubmit={evt => {
            evt.preventDefault()
            signup(evt.target.username.value, evt.target.email.value)
            browserHistory.push('/checkout/reviewOrder/:orderId')
          } }>
          <fieldset>
            <div id="legend">
              <legend className="">Checkout As Guest</legend>
            </div>
            <div className="control-group">
              <label className="control-label" htmlFor="firstName">First Name</label>
              <div className="controls">
                <input type="text" id="firstName" name="firstName" className="input-xlarge"/>
              </div>
            </div>
            <div className="control-group">
              <label className="control-label" htmlFor="lastName">Last Name</label>
              <div className="controls">
                <input type="text" id="lastName" name="lastName" className="input-xlarge"/>
              </div>
            </div>
            <div className="control-group">
              <label className="control-label" htmlFor="email">E-mail</label>
              <div className="controls">
                <input type="text" id="email" name="email" className="input-xlarge"/>
                <p className="help-block">Please provide your E-mail</p>
              </div>
            </div>
            <div className="control-group">
              <div className="controls">
                <button className="btn btn-success">CHECKOUT AS GUEST</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
  </div>
)

/* ------ CONTAINER ------ */

import {signup, login} from 'APP/app/reducers/auth-reducer'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login, signup},
)(GuestCheckout)
