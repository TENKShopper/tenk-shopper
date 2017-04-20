import React, {Component} from 'react'

import NavBarMain from './components/NavBar'

export default function App({children}) {
  return (
    <div id="main" className="container-fluid">
      <NavBarMain />
      <div className="col-xs-2">

      </div>
      <div className="col-xs-10">
        { children }
      </div>
    </div>
  )
}
