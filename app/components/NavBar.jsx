import React from 'react'
import {Link} from 'react-router'
import Login from './Login'

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">Brand</a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"> MEN <span className="caret"></span></a>
              <ul className="dropdown-menu" role="menu">
                <li><a href="#">Action</a></li>
                <li className="divider"></li>
                <li><a href="#">Separated link</a></li>
                <li className="divider"></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"> WOMEN <span className="caret"></span></a>
              <ul className="dropdown-menu" role="menu">
                <li><a href="#">Action</a></li>
                <li className="divider"></li>
                <li><a href="#">Separated link</a></li>
                <li className="divider"></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
          </ul>
          <form className="navbar-form navbar-left" role="search">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Search" />
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
          <ul className="nav navbar-nav navbar-right">
            <Login />
            <li><a href="#">Link</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
