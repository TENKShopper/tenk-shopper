import React, {Component} from 'react'

const Home = ({children}) => {
  return (
    <div className="jumbotron">
      <p><a id="jumbobutton" href="/products" className="btn btn-primary btn-lg">View Here</a></p>
    </div>
  )
}

export default Home
