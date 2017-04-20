import React from 'react'
import {connect} from 'react-redux'


  export const  SingleProduct = (props) => {
  return (
    <div>
      This is a single product dummy div
    </div>
  )
}



const mapStateToProps =(state) =>{
  return{
    selectedProduct: state.selectedProduct
  }

}



export default connect(mapStateToProps)(SingleProduct)
