import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Review from '../user/Review'

import { createPendingOrder } from '../../reducers/pendingOrders-reducer'

function SingleProduct({ addLineItem, selectedProduct, user }) {

  const handleLineItem = event => {
    const productOrder = {
      productId: selectedProduct.id,
      quantity: event.target.quantity.value,
      orderPrice: event.target.quantity.value * selectedProduct.price
    }
    return user ? addLineItem(productOrder, user.id) : addLineItem(productOrder)
  }

  return (
    <div className='singleProductWrapper'>

      <div className='singleProductPhotos'>
        {selectedProduct.photos && renderPhoto(selectedProduct.photos[0])}
      </div>

      <div className='singleProductInfo'>
        <div className='singleProductName'>
          <h2>{selectedProduct.name}</h2>
        </div>

        <form className='form-wrapper'
          method='POST'
          onSubmit={handleLineItem}>
          <div className='singleProductPrice'>
            <h4>${selectedProduct.price}.00</h4>
          </div>
          <div className="form-quantity">
            <label>Qty</label>
            <input
              name="quantity"
              type="number"
            />
          </div>
          <div className="order-button">
            <button className="btn btn-success">
              Add to Cart
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

const renderPhoto = photo => {
  const photoStyle = { width: '300px', height: '400px' }
  return (<img className="d-block img-fluid" src={photo} style={photoStyle} />)
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.selectedProduct,
    user: state.auth
  }
}

const mapDispatchToProps = dispatch => ({
  addLineItem: (productOrder, userId) => {
    dispatch(createPendingOrder(productOrder, userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
