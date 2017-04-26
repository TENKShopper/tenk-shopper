import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Review from '../user/Review'
import {addReview} from '../../reducers/reviews-reducer'
import { createPendingOrder } from '../../reducers/pendingOrders-reducer'

function SingleProduct({ addReview, selectedProduct , user }) {

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

        {selectedProduct.reviews && selectedProduct.reviews.map(function(review) {
          return <Review review={review} />
        }) }

      </div>
      {user ? renderReviewSubmit() : null}
    </div>
  )
}

  const handleLineItem = event => {
    event.preventDefault()
    const productOrder = {
      product: selectedProduct,
      quantity: event.target.quantity.value,
      orderPrice: event.target.quantity.value * selectedProduct.price
    }
    return addLineItem(productOrder)
  }

  const renderReviewSubmit = () => {
    return(
      <form onSubmit={ (e)=> {
          e.preventDefault()
          addReview(e.target.value)
        }
      }>
      <textarea type="text" className ='review-submit' />
      <button type="submit">Submit Review</button>
    </form>
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
  },
  addReview: (review) => {
     dispatch(addReview(review))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
