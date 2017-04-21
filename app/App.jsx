import React, {Component} from 'react'

import NavBarMain from './components/NavBar'

export default function App({children}) {
  return (
    <div id="main" className="container-fluid">
      <NavBarMain />
        { children }
    </div>
  )
}
