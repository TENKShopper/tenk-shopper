import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Review from '../user/Review'

function SingleProduct({ selectedProduct }) {
  return (
    <div className='singleProductWrapper'>

      <div className='singleProductPhotos'>
        {selectedProduct.photos && renderPhoto(selectedProduct.photos[0])}
      </div>

      <div className='singleProductInfo'>
        <div className='singleProductName'>
          <h2>{selectedProduct.name}</h2>
        </div>

        <div className='singleProductPrice'>
          <h4>${selectedProduct.price}.00</h4>
        </div>

        <form className='form-horizontal'
          method='POST'
          onSubmit={handleLineItem}>
          <div className="control-group">
            <label className="control-label">Qty</label>
            <div className="controls">
              <input
                name="quantity"
                type="number"
              />
            </div>
          </div>
          <div className="control-group">
            <button className="btn btn-success">
              Add to Order
          </button>
          </div>
        </form>

        <div className='singleProductDesc'>
          <p>{selectedProduct.description}</p>
        </div>
      </div>

      <div>
        {/*
        { selectedProduct.reviews.map(function(review) {
          return <Review review={review} />
        }) }
      */}
      </div>
    </div>
  )
}

const handleLineItem = event => {

}

const renderPhoto = photo => {
  const photoStyle = { width: '300px', height: '400px' }
  return (<img className="d-block img-fluid" src={photo} style={photoStyle} />)
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.selectedProduct
  }
}

const mapDispatchToProps = dispatch => ({
  addLineItem: (productOrder) => {
    dispatch(addProductToLineItem(productOrder))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
