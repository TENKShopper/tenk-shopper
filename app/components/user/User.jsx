import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import UserSidebar from './UserSidebar'

const User = ({ user, logout, children }) => (
  <div>
    <UserSidebar />
    <div className="col-md-9">
      {children}
    </div>
  </div>
)

export default connect(
  ({ auth }) => ({ user: auth })
)(User)
