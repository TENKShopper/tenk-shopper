import React, {Component} from 'react'

import NavBarMain from './components/NavBar'
// import Sidebar from '../containers/Sidebar';

export default function App({children}) {
  return (
    <div id="main" className="container-fluid">
      <div className="col-xs-2">

      </div>
      <div className="col-xs-10">
        { children }
      </div>
      <NavBarMain />
    </div>
  )
}
