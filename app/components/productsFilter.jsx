/*

This is the component  we'll use for the Products views.

The component consists of a sidebar (2/3 col) and a display (10/9 col). It maintains local state, which tracks the inputs of the query form.

The sidebar always renders with said query form. When the user is an admin, it renders with an additional form to add a new product.

The display renders all the ProductItem components delineated by the Products prop passed through state.

*/

import React, {Component} from 'react'
import {connect} from 'react-redux'

import ProductItem from './productitem'

/* ----- COMPONENT ----- */

class UsersFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      category: '',
    }
    this.renderProductsFilter = this.renderProductsFilter.bind(this)
    this.renderNewProductWidget = this.renderNewProductWidget.bind(this)
    this.filterProducts = this.filterProducts.bind(this)
    this.submitNewProduct = this.submitNewProduct.bind(this)
  }
  render() {
    return (
      <div className="container">
        <div className="col-xs-2">
          { this.props.isAdmin ? this.renderNewProductWidget() : null }
          { this.renderProductsFilter() }
        </div>
        <div className="col-xs-10">
          { this.props.products &&
            this.props.products
            .filter(this.filterProducts)
            .map(product => <ProductItem product={product} key={product.id} />)
          }
        </div>
      </div>
    )
  }
}

/* TODO: adapt filterProducts for Categories array */
const filterProducts = (product) => {
  const nameMatch = new RegExp(this.state.name, 'i')
  const categoryMatch = new RegExp(this.state.category, 'i')
  return nameMatch.test(product.name) &&
        categoryMatch.test(product.categories)
}

const renderProductsFilter = () => {
  return (
    <div className="list-group-item min-content user-item">
      <div className="media">
        <div className="media-left media-middle icon-container">
          <span className="glyphicon glyphicon-search" />
        </div>
        <div className="media-body">
          <h4 className="media-heading tucked">
            <input
              type="text"
              placeholder="Jean Doe"
              className="form-like"
              onChange={evt => this.setState({ name: evt.target.value })}
            />
          </h4>
          <h5 className="tucked">
            <input
              type="email"
              placeholder="email@website.com"
              className="form-like"
              onChange={evt => this.setState({ email: evt.target.value })}
            />
          </h5>
        </div>
      </div>
    </div>
  )
}

const renderNewProductWidget = () => {
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

const submitNewProduct = (event) => {
  event.preventDefault()
  const user = {
    name: event.target.name.value,
    email: event.target.email.value,
  }
  this.props.addUser(user)
  // clear the inputs
  event.target.name.value = ''
  event.target.email.value = ''
}

/* ----- CONTAINER ----- */

// TODO: revisit what state to pass to props
const mapStateToProps = (state) => {
  return {
    isAdmin: state.currentUser && state.currentUser.isAdmin,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersFilter)
