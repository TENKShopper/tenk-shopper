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
      selectedCheckboxes: []
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
          { this.props.isAdmin ? <NewProductForm /> : null }
          { this.renderProductsFilter() }
          { this.state.collectionQuery ? this.renderRefineProductSelection() : null }
        </div>
        <div className="col-md-9">
          { this.props.products
            .filter(this.filterProducts)
            .map(product => {
              return (
                <div>
                  <ProductItem key={product.id} removeProduct={this.props.removeProduct} product={product} />
                </div>
              )
            }) }
        </div>
      </div>
    )
  }

  /* ------ HELPER FUNCTIONS ------ */

  renderProductsFilter() {
    return (
      <div>

        <div>
          <div className="media-left media-middle icon-container">
            <div className="glyphicon glyphicon-search" />
          </div>
          <div className="media-body media-middle">
            <h4>Search by Product Name</h4>
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

        <div>
          <div className="media-left media-middle icon-container">
            <div className="glyphicon glyphicon-filter" />
          </div>
          <div className="media-body media-middle">
            <h4>Filter by Collection</h4>
          </div>
          <div>
            <select
              name="collectionQuery"
              placeholder="Select a collection"
              onChange={this.handleInputChange}
            >
              <option value="Display all">Select a collection</option>
              { this.props.collections
                .map(collection => <option value={collection}>{collection}</option>)
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
        <h4>Refine Selection</h4>
        <form>
          <h5>Gender</h5>
          <label>Male</label>
          <input
            name="selectsMale"
            type="checkbox"
            value="Male"
            className="product-selection-checkbox"
            onChange={this.toggleCheckbox}
          />
          <label>Female</label>
          <input
            name="selectsFemale"
            type="checkbox"
            value="Female"
            className="product-selection-checkbox"
            onChange={this.toggleCheckbox}
          />
          <label>Unisex</label>
          <input
            name="selectsUnisex"
            type="checkbox"
            value="Unisex"
            className="product-selection-checkbox"
            onChange={this.toggleCheckbox}
          />
          <h5>Clothing Type</h5>
          <label>Shirts</label>
          <input
            name="selectsShirts"
            type="checkbox"
            value="Shirts"
            className="product-selection-checkbox"
            onChange={this.toggleCheckbox}
          />
          <label>Pants</label>
          <input
            name="selectsPants"
            type="checkbox"
            value="pants"
            className="product-selection-checkbox"
            onChange={this.toggleCheckbox}
          />
          <label>Shoes</label>
          <input
            name="selectsShoes"
            type="checkbox"
            value="Shoes"
            className="product-selection-checkbox"
            onChange={this.toggleCheckbox}
          />
          <h5>Size</h5>
          <label>S</label>
          <input
            name="selectsSmall"
            type="checkbox"
            value="Small"
            className="product-selection-checkbox"
            onChange={this.toggleCheckbox}
          />
          <label>M</label>
          <input
            name="selectsMedium"
            type="checkbox"
            value="Medium"
            className="product-selection-checkbox"
            onChange={this.toggleCheckbox}
          />
          <label>L</label>
          <input
            name="largeQuery"
            type="checkbox"
            value="Large"
            className="product-selection-checkbox"
            onChange={this.toggleCheckbox}
          />
        </form>
      </div>
    )
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  toggleCheckbox(label) {
    if (this.state.selectedCheckboxes.contains(label)) {
      this.setState({
        selectedCheckboxes: this.state.selectedCheckboxes.filter(checkbox => checkbox !== label)
      })
    } else {
      this.setState({
        selectedCheckboxes: this.state.selectedCheckboxes.concat(label)
      })
    }
  }

  filterProducts(product) {
    const nameMatch = new RegExp(this.state.nameQuery, 'i')
          , matchesNameQuery = nameMatch.test(product.name)
          , viewable = this.props.isAdmin ? true : product.available

    if (this.state.collectionQuery) {
      return product.collections.includes(this.state.collectionQuery) && matchesNameQuery && viewable
    }
    return matchesNameQuery && viewable
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
