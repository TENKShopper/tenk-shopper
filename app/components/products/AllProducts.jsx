/*

This is the component  we'll use for the Products views.

The component consists of a sidebar (3 col) and a display (9 col). Its local state tracks the inputs of the filter form.

The sidebar always renders with said query form. When the user is an admin, it renders with an additional form to add a new product.

The display renders all the ProductItem components delineated by the Products prop passed through state.

*/

import React, { Component } from 'react'
import { connect } from 'react-redux'

import NewProductForm from './NewProductForm'
import ProductItem from './ProductItem'
import ProductsFilter from './ProductsFilter'
import RefineProductSelection from './RefineProductSelection'

/* ----- COMPONENT ----- */

class AllProducts extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nameQuery: '',
      collectionQuery: null,
      genderQuery: [],
      typeQuery: [],
      sizeQuery: []
    }
  }

  render() {
    return (
      <div className="products-view" >
        <div className="col-md-3">
          {/* TODO: create NewProductForm functionality */}
          {this.props.isAdmin ? <NewProductForm /> : null}

          <ProductsFilter handleInputChange={this.handleInputChange} collections={this.props.collections} />

          {this.state.collectionQuery ? <RefineProductSelection toggleCheckbox={this.toggleCheckbox} /> : null}

        </div>
        <div className="col-md-9">
          {this.props.products
            .filter(this.filterProducts)
            .map(product => <ProductItem key={product.id} removeProduct={this.props.removeProduct} product={product} />
            )}
        </div>
      </div>
    )
  }

  /* ------ HELPER FUNCTIONS ------ */

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  toggleCheckbox = event => {
    const label = event.target.value
        , field = event.target.name + 'Query'
    if (this.state[field].includes(label)) {
      this.setState({
        [field]: this.state[field].filter(checkbox => checkbox !== label)
      })
    } else {
      this.setState({
        [field]: this.state[field].concat(label)
      })
    }
  }

  filterProducts = product => {
    const nameMatch = new RegExp(this.state.nameQuery, 'i')
          // Checks whether the product's name matches the input
          , matchesNameQuery = nameMatch.test(product.name)
          // Checks whether the product is available
          , viewable = this.props.isAdmin ? true : product.available
          // Checks whether the product matches refinement selectors
          , genderChecked =
            this.state.genderQuery.length === 0 ||
            this.state.genderQuery.includes(product.gender)
          , sizeChecked =
            this.state.sizeQuery.length === 0 ||
            this.state.sizeQuery.includes(product.size)
          , typeChecked =
            this.state.typeQuery.length === 0 ||
            this.state.typeQuery.includes(product.type)
          , checked = genderChecked && sizeChecked && typeChecked
          // Checks whether the product matches the currently selected collection
          , inCollection =
              this.state.collectionQuery === 'All' ||
              this.state.collectionQuery === null ||
              product.collections.includes(this.state.collectionQuery)

    return inCollection && matchesNameQuery && viewable && checked
  }
}

/* ----- CONTAINER ----- */

// TODO: revisit what state to pass to props
const mapStateToProps = (state) => {
  return {
    isAdmin: state.currentUser && state.currentUser.isAdmin,
    products: state.products,
    collections: state.products ? state.products.map(product => product.collections)
      .reduce((flatArray, collectionArray) => {
        return flatArray.concat(...collectionArray)
      }, [])
      .filter((collection, index, origArray) => origArray.indexOf(collection) === index) : null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // addProduct
    // removeProduct
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
