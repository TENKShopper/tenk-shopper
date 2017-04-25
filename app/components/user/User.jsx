import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import UserSidebar from './UserSidebar'

const User = ({ user, logout, children }) => (
  <div>
    <div>
      <legend id="accountTitle">My Account</legend>
    </div>
    <UserSidebar />
    <div className="vertical-line">
      <div className="col-md-9">
        {children}
      </div>
    </div>
  </div>
)

export default connect(
  ({ auth }) => ({ user: auth })
)(User)
