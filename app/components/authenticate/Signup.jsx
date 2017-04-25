import React from 'react'
import {browserHistory} from 'react-router'

/* ------ COMPONENT ------ */

const Signup = ({signup}) => (
  <div className="col-md-6">
    <form className="form-horizontal" action='' method="POST"
      onSubmit={evt => {
        evt.preventDefault()
        signup(evt.target.username.value, evt.target.email.value, evt.target.password.value)
        browserHistory.push('/')
      } }>
      <fieldset>
        <div id="legend">
          <legend className="">Signup</legend>
        </div>
        <div className="control-group">
          <label className="control-label" htmlFor="username">Username</label>
          <div className="controls">
            <input type="text" id="username" name="username" placeholder="" className="input-xlarge"/>
            <p className="help-block">Username can contain any letters or numbers, without spaces</p>
          </div>
        </div>
        <div className="control-group">
          <label className="control-label" htmlFor="email">E-mail</label>
          <div className="controls">
            <input type="text" id="email" name="email" placeholder="" className="input-xlarge"/>
            <p className="help-block">Please provide your E-mail</p>
          </div>
        </div>
        <div className="control-group">
          <label className="control-label" htmlFor="password">Password</label>
          <div className="controls">
            <input type="password" id="password" name="password" placeholder="" className="input-xlarge"/>
            <p className="help-block">Password should be at least 4 characters</p>
          </div>
        </div>
        <div className="control-group">
          <div className="controls">
            <button className="btn btn-success">Signup</button>
          </div>
        </div>
      </fieldset>
        <div className="or buffer">
          <div className="back-line">
            <br></br>
            <legend className="">OR</legend>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/api/auth/login/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>Signup with Google</span>
            </a>
          </p>
          <p>
            <a
              target="_self"
              href="/api/auth/login/github"
              className="btn btn-social btn-github">
              <i className="fa fa-github" />
              <span>Signup with GitHub</span>
            </a>
          </p>
          <p>
            <a
              target="_self"
              href="/api/auth/login/facebook"
              className="btn btn-social btn-facebook">
              <i className="fa fa-facebook" />
              <span>Signup with Facebook</span>
            </a>
          </p>
        </div>
    </form>
  </div>
)

/* ------ CONTAINER ------ */

import {signup} from 'APP/app/reducers/auth-reducer'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {signup},
)(Signup)
