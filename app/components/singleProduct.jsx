import React from 'react'
import {connect} from 'react-redex'
import singleProductPresentational from './singleProductPresentational'

const mapStateToProps =(state) =>{
  return{
    selectedProduct: state.selectedProduct
  }

}

const SingleProductContainer = connect(mapStateToProps)(singleProductPresentational)
export default SingleProductContainer
