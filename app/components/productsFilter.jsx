/*

This is the component  we'll use for the Products views.

The component consists of a sidebar (3 col) and a display (9 col). Its local state tracks the inputs of the filter form.

The sidebar always renders with said query form. When the user is an admin, it renders with an additional form to add a new product.

The display renders all the ProductItem components delineated by the Products prop passed through state.

*/

import React, { Component } from 'react'
import { connect } from 'react-redux'

// import ProductItem from './productitem'

/* ----- DUMMY DATA ----- */

const dummyProducts = [
  {
    name: 'Blue Suede Shoes',
    categories: ['shoes', 'blue']
  },
  {
    name: 'Red Canvas Shoes',
    categories: ['shoes', 'red']
  },
  {
    name: 'Green Trunks',
    categories: ['truks', 'green']
  }
]

/* ----- COMPONENT ----- */

class ProductsFilter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nameQuery: '',
      category: '',
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
          { this.props.isAdmin ? this.renderNewProductWidget() : null }
          { this.renderProductsFilter() }
        </div>
        <div className="col-md-9">
          { this.props.products
            .filter(this.filterProducts)
            .map(product => <h5>{product.name}</h5>) }
          {/* { this.products &&
            this.products
            .filter(this.filterProducts)
            .map(product => <ProductItem product={product} key={product.id} />) } */}
        </div>
      </div>
    )
  }

    /* ------ Helper Functions ------ */

  renderProductsFilter() {
    return (
      <div>
        <div>
          <div className="media-left media-middle icon-container">
            <div className="glyphicon glyphicon-search" />
          </div>
          <div className="media-body media-middle">
            <h4>Search Products</h4>
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

  /* TODO: write filterProducts for Categories array */
  filterProducts(product) {
    const nameMatch = new RegExp(this.state.nameQuery, 'i')
    return nameMatch.test(product.name)
    // && categoriesFilter
  }

  submitNewProduct(event) {
    event.preventDefault()
    const user = {
      name: event.target.name.value,
      email: event.target.email.value,
    }
    this.props.addProduct(user)
    // clear the inputs
    event.target.name.value = ''
    event.target.email.value = ''
  }

}

/* ----- CONTAINER ----- */

// TODO: revisit what state to pass to props
const mapStateToProps = (state) => {
  return {
    isAdmin: state.currentUser && state.currentUser.isAdmin,
    products: dummyProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // addProduct
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilter)
