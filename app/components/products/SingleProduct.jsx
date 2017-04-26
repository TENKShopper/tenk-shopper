import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Review from '../user/Review'
import {addReview} from '../../reducers/reviews-reducer'

function SingleProduct({ addReview, selectedProduct , user }) {

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
  return (
    <div className='singleProduct'>

      <div className='singleProductPhotos'>
        {selectedProduct.photos && renderPhoto(selectedProduct.photos[0])}
      </div>

      <div className='singleProductName'>
        <h2>{selectedProduct.name}</h2>
      </div>

      <div className='singleProductPrice'>
        <h4>{selectedProduct.price}</h4>
      </div>

      <div className='singleProductQty'>
        <input
          name="quantity"
          type="number"
          onChange={generateLineItem}
        />
      </div>

      <div className='singleProductDesc'>
        <p>{selectedProduct.description}</p>
      </div>

      <div className='addProductButton'>

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



const renderPhoto = photo => {
  const photoStyle = { width: '300px', height: '400px' }
  return (<img className="d-block img-fluid" src={photo} style={photoStyle} />)
}

const generateLineItem = event => {
  const quantity = event.target.value
}

const mapStatetoProps = (state) => {
  return {
    selectedProduct: state.selectedProduct,
    user: state.auth
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    addReview: (review) => {
      dispatch(addReview(review))
    }
  }

}

export default connect(mapStatetoProps, mapDispatchToProps)(SingleProduct)
