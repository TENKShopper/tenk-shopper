import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Review from '../user/Review'
import {addReview} from '../.reducers/reviews-reducer'

function SingleProduct({ selectedProduct }) {
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
        <button>
        </button>
      </div>

      <div>

        { selectedProduct.reviews.map(function(review) {
          return <Review review={review} />
        }) }

      </div>
    </div>
  )
}

const renderReviewSubmit = () => {
    return(
      <form onSubmit={ (e)=> {onSubmit}  }>
         <input type="text" />
        <label> Submit New Review </label>
        <button type="submit">Submit Review</button>
      </form>
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
    selectedProduct: state.selectedProduct
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    onSubmit => {
      const action = addReview()
      dispatch(action)
    }
  }

}

export default connect(mapStatetoProps, mapDispatchToProps)(SingleProduct)
