import React from 'react'
import { Link } from 'react-router'
import { Modal, NavBar, ButtonDropdown } from 'simple-react-bootstrap'
import WhoAmI from './WhoAmI'

/* ------ COMPONENT ------ */

const NavBarMain = ({ user }) => {
  return (
    <NavBar>
      <NavBar.Header>
        <NavBar.Brand>
          <a href="/" style={{ cursor: 'pointer' }}>TENK</a>
        </NavBar.Brand>
        <NavBar.Toggle />
      </NavBar.Header>
      <NavBar.Header>
        <NavBar.Brand>
          <a href="/products" style={{ cursor: 'pointer' }}>SHOP ALL</a>
        </NavBar.Brand>
        <NavBar.Toggle />
      </NavBar.Header>
      <NavBar.Nav className="pull-right">
        {user ? <WhoAmI /> : <NavBar.Item active={true} href="/authenticate">LOGIN/SIGNUP</NavBar.Item>}
      </NavBar.Nav>
    </NavBar>
  )
}

/* ------ CONTAINER ------ */

import { connect } from 'react-redux'

export default connect(
    ({ auth }) => ({ user: auth })
)(NavBarMain)
