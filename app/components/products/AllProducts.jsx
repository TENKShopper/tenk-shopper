/*

This is the component  we'll use for the Products views.

The component consists of a sidebar (3 col) and a display (9 col). Its local state tracks the inputs of the filter form.

The sidebar always renders with said query form. When the user is an admin, it renders with an additional form to add a new product.

The display renders all the ProductItem components delineated by the Products prop passed through state.

*/

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { groupByCollection } from '../utils'

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

  // todo: look into using a Set here
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

  inCollection(product) {
    return this.state.collectionQuery === 'All' ||
    this.state.collectionQuery === null ||
    product.collections.includes(this.state.collectionQuery)
  }

  genderChecked = (product) => {
    return this.state.genderQuery.length === 0 ||
      this.state.genderQuery.includes(product.gender)
  }

  sizeChecked = (product) => {
    return this.state.sizeQuery.length === 0 ||
      this.state.sizeQuery.includes(product.size)
  }

  typeChecked = (product) => {
    return this.state.typeQuery.length === 0 ||
      this.state.typeQuery.includes(product.type)
  }

  matchesNameQuery = (product) => {
    const nameMatch = new RegExp(this.state.nameQuery, 'i')
    return nameMatch.test(product.name)
  }

  viewable = (product) => {
    return this.props.isAdmin ? true : product.available
  }

  checked = (product) => {
    return this.genderChecked(product) && this.sizeChecked(product) && this.typeChecked(product)
  }

  filterProducts = product => {
    return this.inCollection(product) && this.matchesNameQuery(product) && this.viewable(product) && this.checked(product)
  }
}

/* ----- CONTAINER ----- */

// TODO: revisit what state to pass to props
const mapStateToProps = (state) => {
  return {
    isAdmin: state.currentUser && state.currentUser.isAdmin,
    products: state.products,
    collections: state.products ? groupByCollection(state.products) : null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // addProduct
    // removeProduct
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
