/*

This is the component  we'll use for the Products views.

The component consists of a sidebar (3 col) and a display (9 col). Its local state tracks the inputs of the filter form.

The sidebar always renders with said query form. When the user is an admin, it renders with an additional form to add a new product.

The display renders all the ProductItem components delineated by the Products prop passed through state.

*/

import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProductItem from './ProductItem'

/* ----- DUMMY DATA ----- */

const dummyProducts = [
  {
    name: 'Blue Suede Shoes',
    categories: ['Spring 17'],
    available: true,
    id: 1,
    photos: ['http://placehold.it/150x150'],
    price: '$35.00'
  },
  {
    name: 'Red Canvas Shoes',
    categories: ['Spring 17'],
    available: false,
    id: 2,
    photos: ['http://placehold.it/150x150']
  },
  {
    name: 'Green Trunks',
    categories: ['Spring 17'],
    gender: 'Male',
    size: 'L',
    available: true,
    id: 3,
    photos: ['http://placehold.it/150x150']
  },
  {
    name: 'Black Boots',
    categories: ['Winter 16'],
    gender: 'Unisex',
    size: 'L',
    available: true,
    id: 4,
    photos: ['http://placehold.it/150x150']
  }
]

const dummyCategories = ['Spring 17', 'Winter 16']

/* ----- COMPONENT ----- */

class ProductsFilter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nameQuery: '',
      categoryQuery: '',
    }
    this.renderProductsFilter = this.renderProductsFilter.bind(this)
    this.renderNewProductWidget = this.renderNewProductWidget.bind(this)
    this.filterProducts = this.filterProducts.bind(this)
    this.submitNewProduct = this.submitNewProduct.bind(this)
  }

  render() {
    return (
      <div className="products-view" >
        <div className="col-md-3">
          {/* TODO: create renderNewProductWidget functionality */}
          { this.props.isAdmin? this.renderNewProductWidget() : null }
          { this.renderProductsFilter() }
        </div>
        <div className="col-md-9">
          { this.props.products
            .filter(this.filterProducts)
            .map(product => {
              return (
                <div>
                  <ProductItem removeProduct={this.props.removeProduct} product={product} key={product.id} />
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
              type="text"
              placeholder="Input product name"
              className="form-like"
              onChange={evt => this.setState({ nameQuery: evt.target.value })}
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
              placeholder="Select a collection"
              onChange={evt => this.setState({ categoryQuery: evt.target.value })}
            >
              <option value="Select a category">Select a category</option>
              { this.props.categories
                .map(category => <option value={category}>{category}</option>)
              }
            </select>
          </div>
        </div>

        <div>
          <h4>Refine Selection</h4>
          <form>
            <label>Gender</label>
            <input
              name="selectsMale"
              type="checkbox"
              value="Male"
              onChange={ this.handleCheckboxChange }
            />
            <input
              name="selectsFemale"
              type="checkbox"
              value="Female"
              onChange={ this.handleCheckboxChange }
            />
            <input
              name="selectsUnisex"
              type="checkbox"
              value="Unisex"
              onChange={ this.handleCheckboxChange }
            />
          </form>
        </div>
      </div>
    )
  }
  renderNewProductWidget() {
    return (
      <div>
        <h3>Add a User</h3>
        <div className="list-group-item min-content user-item">
          <form className="media" onSubmit={this.submitNewProduct}>
            <div className="media-left media-middle icon-container">
              <button
                type="submit"
                className="glyphicon glyphicon-plus clickable"
              />
            </div>
            <div className="media-body">
              <h4 className="media-heading tucked">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Input new product name"
                  className="form-like"
                />
              </h4>
              <h5 className="tucked">
                <textarea
                  name="description"
                  required
                  placeholder="Input new product description"
                  className="form-like"
                />
              </h5>
            </div>
          </form>
        </div>
      </div>
    )
  }

  /* TODO: think through categories */
  filterProducts(product) {
    const nameMatch = new RegExp(this.state.nameQuery, 'i')
          , matchesNameQuery = nameMatch.test(product.name)
          , viewable = this.props.isAdmin ? true : product.available

    if (this.state.categoryQuery.length > 1) {
      return product.categories.includes(this.state.categoryQuery) && matchesNameQuery && viewable
    }

    return matchesNameQuery && viewable
  }

  submitNewProduct(event) {
    event.preventDefault()
    const product = {
      name: event.target.name.value,
    }
    this.props.addProduct(product)
    // clear the inputs
    event.target.name.value = ''
  }

}

/* ----- CONTAINER ----- */

// TODO: revisit what state to pass to props
const mapStateToProps = (state) => {
  return {
    isAdmin: state.currentUser && state.currentUser.isAdmin,
    products: dummyProducts,
    categories: dummyCategories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // addProduct
    // removeProduct
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilter)
