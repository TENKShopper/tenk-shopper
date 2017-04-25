import React from 'react'
import {browserHistory} from 'react-router'

export const Login = ({ login }) => (
  <div>
    <div className="col-md-6">
      <form className="form-horizontal" action='' method="POST"
        onSubmit={evt => {
          evt.preventDefault()
          login(evt.target.email.value, evt.target.password.value)
          browserHistory.push('/')
        } }>
      <fieldset>
        <div id="legend">
          <legend className="">Login</legend>
        </div>
        <div className="control-group">
          <label className="control-label" htmlFor="email">Email</label>
          <div className="controls">
            <input type="text" id="email" name="email" placeholder="" className="input-xlarge"/>
          </div>
        </div>
        <div className="control-group">
          <label className="control-label" htmlFor="password">Password</label>
          <div className="controls">
            <input type="password" id="password" name="password" placeholder="" className="input-xlarge"/>
          </div>
        </div>
        <br></br>
        <div className="control-group">
          <div className="controls">
            <button className="btn btn-success">Login</button>
          </div>
        </div>
      </fieldset>
    </form>
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
            <span>Login with Google</span>
          </a>
        </p>
        <p>
          <a
            target="_self"
            href="/api/auth/login/github"
            className="btn btn-social btn-github">
            <i className="fa fa-github" />
            <span>Login with GitHub</span>
          </a>
        </p>
        <p>
          <a
            target="_self"
            href="/api/auth/login/facebook"
            className="btn btn-social btn-facebook">
            <i className="fa fa-facebook" />
            <span>Login with Facebook</span>
          </a>
        </p>
      </div>
    </div>
  </div>
)

/* -----------------    CONTAINER     ------------------ */

import {login} from 'APP/app/reducers/auth-reducer'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Login)
