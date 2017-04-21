import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'




export const  AllProducts = (props) => {
  return(
    const products = props.products
  <div>
    <h3> Browse Products </h3>

    <div className='list-group'>
      {
        //`products.map




      }
    </div>




  </div>
  )

}



const mapStateToProps = (state) =>{
  return{
    allProducts: state.allProducts
  }
}

export default connect(mapStateToProps)(AllProducts)
