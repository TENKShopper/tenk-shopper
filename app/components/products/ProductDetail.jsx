/*

This component details single products.

The display renders the selectedProduct passed in as props from the onEnter hook, which gets the desired product ID from the req param.

When the user is an admin, it renders with forms for updating all fields.

*/

import React, { Component } from 'react'
import { connect } from 'react-redux'

/* ----- DUMMY DATA ----- */

const dummyProduct = {
  name: 'Blue Suede Shoes',
  price: 3500,
  photos: ['http://placehold.it/150x150'],
}

/* ----- COMPONENT ----- */

class ProductDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nameQuery: '',
      categoryQuery: '',
    }
  }
  render() {
    return (
      <div className="product-view" >
        {/* TODO: fill in with ProductDetail component */}
      </div>
    )
  }

  /* ------ HELPER FUNCTIONS ------ */

}

/* ----- CONTAINER ----- */

// TODO: revisit what state to pass to props
const mapStateToProps = (state) => {
  return {
    isAdmin: state.currentUser && state.currentUser.isAdmin,
    selectedProduct: dummyProduct,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // addProduct
    // removeProduct
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
