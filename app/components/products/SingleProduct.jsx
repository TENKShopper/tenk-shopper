import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Review from '../user/Review'

function SingleProduct({ selectedProduct }) {
  console.log("selectedProduct", selectedProduct)
  return (
    <div className='singleProduct'>

      <h2>{ selectedProduct.name }</h2>
      <div className="list-group-item min-content single-product">
        <div className="media">
          <div className="media-left media-middle icon-container">
            <img className="media-object img-circle product-list-photo" src={ selectedProduct.photos && selectedProduct.photos[0] } />
          </div>
          <Link
            className="media-body"
            activeClassName="active"
            to={`/products/${ selectedProduct.id }`}>

            <h5 className="tucked">
              <span>{ selectedProduct.description }</span>
              <span>{ selectedProduct.price }</span>
              <span>{ selectedProduct.avgRating }</span>
            </h5>
          </Link>
        </div>
      </div>
      <div>
        {/* add to cart button will go here */}
      </div>

      <div>
      {/* TODO: write logic for selectedProduct to arrive from state
        { selectedProduct.reviews.map(function(review) {
          return <Review review={review} />
        }) }
      */}
      </div>
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    selectedProduct: state.selectedProduct
  }
}

export default connect(mapStatetoProps)(SingleProduct)
