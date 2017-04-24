import React from 'react'
import { Link } from 'react-router'
import { Modal, NavBar, ButtonDropdown } from 'simple-react-bootstrap'
import WhoAmI from './WhoAmI'
import { connect } from 'react-redux'

const NavBarMain = ({ user }) => {
  return (
    <NavBar>
      <NavBar.Header>
        <NavBar.Brand>
          <a href="/" style={{ cursor: 'pointer' }}>TENK</a>
        </NavBar.Brand>
        <NavBar.Toggle />
      </NavBar.Header>
      <NavBar.Nav>
        <NavBar.Item className="class-on-item">Link 1</NavBar.Item>
        <NavBar.Item disabled={true}>Link 2</NavBar.Item>
        <NavBar.Dropdown toggleClassName="pointer-cursor" style={{ color: 'red' }} text="MENS">
          <NavBar.Item>SHIRTS</NavBar.Item>
          <NavBar.Item href="#foo">PANTS</NavBar.Item>
          <NavBar.ItemDivider />
          <NavBar.Item>SHOES</NavBar.Item>
        </NavBar.Dropdown>
        <NavBar.Dropdown toggleClassName="pointer-cursor" style={{ color: 'red' }} text="WOMENS">
          <NavBar.Item>SHIRTS</NavBar.Item>
          <NavBar.Item href="#foo">PANTS</NavBar.Item>
          <NavBar.ItemDivider />
          <NavBar.Item>SHOES</NavBar.Item>
        </NavBar.Dropdown>
      </NavBar.Nav>
      <NavBar.Header>
        <NavBar.Brand>
          <a style={{ cursor: 'pointer' }}>SALE</a>
        </NavBar.Brand>
        <NavBar.Toggle />
      </NavBar.Header>
      <NavBar.Form className="pull-left">
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-btn">
              <button className="btn default">Search</button>
            </span>
            <input className="form-control" placeholder="Quick title search" />
          </div>
        </div>
      </NavBar.Form>
      <NavBar.Nav className="pull-right">
        {user ? <WhoAmI /> : <NavBar.Item active={true} href="/authenticate">LOGIN/SIGNUP</NavBar.Item>}
      </NavBar.Nav>
    </NavBar>
  )
}

export default connect(
    ({ auth }) => ({ user: auth })
  )(NavBarMain)
