import React from 'react'
import NavBarMain from './NavBar'

export const Login = ({ login }) => {
  return (
    <div>
      <NavBarMain />
      <div>
        <form onSubmit={evt => {
            evt.preventDefault()
            login(evt.target.username.value, evt.target.password.value)
          } }>
          <input name="username" />
          <input name="password" type="password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  )
}

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Login)
