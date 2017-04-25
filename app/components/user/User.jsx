import React from 'react'
import {Link} from 'react-router'
import UserSidebar from './UserSidebar'

/* ------ COMPONENT ------ */

const User = ({ user, children }) => (
  <div>
    <div>
      <legend id="accountTitle">My Account</legend>
    </div>
    <UserSidebar />
    <div className="col-md-8">
        {children}
    </div>
  </div>
)

/* ------ CONTAINER ------ */

import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth })
)(User)
