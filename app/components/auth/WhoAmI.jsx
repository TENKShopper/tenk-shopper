import React from 'react'
import {Link} from 'react-router'

/* ------ COMPONENT ------ */

export const WhoAmI = ({ user, logout }) => (
  <div className="whoami">
    <Link id="navUserProfile" to={`/users/${user.id}/orders`}>{user.userName}</Link>
    <button id="logout-btn" className="btn default" onClick={logout}>Logout</button>
  </div>
)

/* ------ CONTAINER ------ */

import {logout} from 'APP/app/reducers/auth-reducer'
import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {logout},
)(WhoAmI)
