import React from 'react'
import Signup from './Signup'
import Login from './Login'

/* ------ COMPONENT ------ */

const Auth = (props) => (
  <div>
    <Login />
    <Signup />
  </div>
)

/* ------ CONTAINER ------ */

import {login} from 'APP/app/reducers/auth-reducer'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Auth)
