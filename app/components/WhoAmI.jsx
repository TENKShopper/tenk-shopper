import React from 'react'
import {Modal, NavBar, ButtonDropdown} from 'simple-react-bootstrap'
import {Link} from 'react-router'

export const WhoAmI = ({ user, logout }) => (
  <div>
    <Link to={`/users/${user.id}/orders`}><NavBar.Item className="whoami-userName">{user.userName}</NavBar.Item></Link>
    <div>
      <button className="btn default" onClick={logout}>Logout</button>
    </div>
  </div>
)

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {logout},
)(WhoAmI)
