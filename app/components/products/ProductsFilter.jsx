/*

This is the component  we'll use for the Products views.

The component consists of a sidebar (3 col) and a display (9 col). Its local state tracks the inputs of the filter form.

The sidebar always renders with said query form. When the user is an admin, it renders with an additional form to add a new product.

The display renders all the ProductItem components delineated by the Products prop passed through state.

*/

import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProductItem from './ProductItem'
import RefineProductSelection from './RefineProductSelection'
import NewProductForm from './NewProductForm'

/* ----- COMPONENT ----- */

class ProductsFilter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nameQuery: '',
      collectionQuery: null,
      genderQuery: [],
      typeQuery: [],
      sizeQuery: []
    }
    this.renderProductsFilter = this.renderProductsFilter.bind(this)
    this.renderRefineProductSelection = this.renderRefineProductSelection.bind(this)
    this.filterProducts = this.filterProducts.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.toggleCheckbox = this.toggleCheckbox.bind(this)
  }

  render() {
    return (
      <div className="products-view" >
        <div className="col-md-3">
          {/* TODO: create renderNewProductWidget functionality */}
          {this.props.isAdmin ? <NewProductForm /> : null}
          {this.renderProductsFilter()}
          {this.state.collectionQuery ? this.renderRefineProductSelection() : null}
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

  renderProductsFilter() {
    return (
      <div>

        <div id="product-selection-textsearch">
          <div className="media-left media-middle icon-container">
            <div className="glyphicon glyphicon-search" />
          </div>
          <div className="media-body media-middle">
            <h4>SEARCH BY PRODUCT NAME</h4>
          </div>
          <div>
            <input
              name="nameQuery"
              type="text"
              placeholder="Input product name"
              className="form-like"
              onChange={this.handleInputChange}
            />
          </div>
        </div>

        <div id="product-selection-collectionfilter">
          <div className="media-left media-middle icon-container">
            <div className="glyphicon glyphicon-filter" />
          </div>
          <div className="media-body media-middle">
            <h4>FILTER BY COLLECTION</h4>
          </div>
          <div>
            <select
              name="collectionQuery"
              onChange={this.handleInputChange}
            >
              <option value="All" key='all'>Show all</option>
              { this.props.collections.map(collection =>
                <option value={collection} key={collection}>{collection}</option>)
              }
            </select>
          </div>
        </div>
      </div>
    )
  }

  renderRefineProductSelection() {
    return (
      <div>
        <span><hr /></span>
        <div className="media-left media-middle icon-container">
          <div className="glyphicon glyphicon-chevron-down" />
        </div>
        <div className="media-body media-middle">
          <h4>REFINE SELECTION</h4>
        </div>
        <form>
          <h5>Gender</h5>
          {['Male', 'Female', 'Unisex'].map(label => (
            <div className="product-selector" key={label}>
              <label>{label}</label>
              <input
                name='gender'
                type="checkbox"
                value={label}
                className="product-selection-checkbox"
                onChange={this.toggleCheckbox}
              />
            </div>
          ))}
          <h5>Clothing Type</h5>
          {['Shirts', 'Pants', 'Shoes'].map(label => (
            <div className="product-selector" key={label}>
              <label>{label}</label>
              <input
                name='type'
                type="checkbox"
                value={label}
                className="product-selection-checkbox"
                onChange={this.toggleCheckbox}
              />
            </div>
          ))}
          <h5>Size</h5>
          {['Small', 'Medium', 'Large'].map(label => (
            <div className="product-selector" key={label}>
              <label>{label}</label>
              <input
                name='size'
                type="checkbox"
                value={label}
                className="product-selection-checkbox"
                onChange={this.toggleCheckbox}
              />
            </div>
          ))}
        </form>
      </div>
    )
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  toggleCheckbox(event) {
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

  filterProducts(product) {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilter)
