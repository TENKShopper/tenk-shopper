import React from 'react'
import { Link } from 'react-router'
import { NavBar, ButtonDropdown } from 'simple-react-bootstrap'
import WhoAmI from './authenticate/WhoAmI'

/* ------ COMPONENT ------ */

const NavBarMain = ({ user }) => {
  return (
    <NavBar>
      <NavBar.Header>
        <NavBar.Brand>
          <Link to="/" style={{ cursor: 'pointer' }}>TENK</Link>
        </NavBar.Brand>
        <NavBar.Toggle />
      </NavBar.Header>
      <NavBar.Header>
        <NavBar.Brand>
          <Link to="/products" style={{ cursor: 'pointer' }}>SHOP ALL</Link>
        </NavBar.Brand>
        <NavBar.Toggle />
      </NavBar.Header>
      <NavBar.Item className="pull-right">
        <Link to="/shoppingCart" className="glyphicon glyphicon-shopping-cart"></Link>
      </NavBar.Item>
      <NavBar.Nav className="pull-right">
        { user ? <WhoAmI /> : <NavBar.Item active={true} href="/authenticate">LOGIN/SIGNUP</NavBar.Item> }
      </NavBar.Nav>
    </NavBar>
  )
}

/* ------ CONTAINER ------ */

import { connect } from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth })
)(NavBarMain)
