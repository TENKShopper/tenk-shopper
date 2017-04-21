/*

This is the component template we'll use for the AllUsers and AllProducts views. These views have a 2/3-column (?) sidebar to the left and a 10/9-column (?) div to the right.

*/

import React, {Component} from 'react'
import {connect} from 'react-redux'

class Sidebar extends Component {
  render() {
    return (<div>
      <h2>Filter By Category</h2>
      <section>

      </section>
    </div>)
  }
}

/* ----- COMPONENT ----- */

class Multiview extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.renderProductsFilter = this.renderProductsFilter.bind(this)
    this.renderUsersFilter = this.renderUsersFilter.bind(this)
  }
  render() {
    return (
      <div className="container">
        <div className="col-xs-2">
          { this.props.location.pathname === '/products' ? this.renderProductsFilter() : null }
          { this.props.location.pathname === '/users' ? this.renderUsersFilter() : null }
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

const filterProducts = (product) => {
  const nameMatch  = new RegExp(this.state.name, 'i');
  const emailMatch = new RegExp(this.state.email, 'i');
  const phoneMatch = new RegExp(this.state.phone, 'i');
  return nameMatch.test(product.name)
      && emailMatch.test(product.email)
      && phoneMatch.test(product.phone);
}

const renderProductsFilter = () => {
  return (
    <div>
      { this.props.isAdmin ? this.renderNewProductWidget() : null }
      <div className= "filter">
        <h4>Filter Products by Category</h4>
        <form className="form-group">
          <select
            type="text"
            placeholder="Select a category"
            className="form-like"
            onChange={evt => this.setState({ product: evt.target.value })}
          >
            //TODO: fill in with categories
          </select>
        </form>
      </div>
    </div>
  )
}

const renderNewProductWidget() {
    return (
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
                placeholder="Jean Doe"
                className="form-like"
              />
            </h4>
            <h5 className="tucked">
              <input
                name="email"
                type="email"
                required
                placeholder="email@website.com"
                className="form-like"
              />
            </h5>
            <h5 className="tucked">
              <input
                name="phone"
                type="tel"
                placeholder="(555) 555-5555"
                className="form-like"
              />
            </h5>
          </div>
        </form>
      </div>
    );
  }

const renderUsersFilter = () => {
  return (
    <div>
      { this.props.isAdmin ? this.renderNewUserWidget() : null }
      <div className= "filter">
        <h4>Filter Users</h4>
        <form className="form-group">
          <input
            type="text"
            placeholder="Jean Doe"
            className="form-like"
            onChange={evt => this.setState({ name: evt.target.value })}
          />
          <input
            type="email"
            placeholder="email@website.com"
            className="form-like"
            onChange={evt => this.setState({ email: evt.target.value })}
          />
        </form>
      </div>
    </div>
  )
}

const FilterInput = (props) => {

  const handleChange = props.handleChange;
  const inputValue = props.inputValue;

  return (
    <form className='form-group' style={{ marginTop: '20px' }}>
      <input
        onChange={handleChange}
        value={inputValue}
        className='form-control'
        placeholder="Find clothing"
      />
    </form>
  )
}

class FilterableProducts extends Component {
  constructor(props) {
    super()
    this.state = { inputValue: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    const inputValue = evt.target.value;
    this.setState({ inputValue })
  }

  render() {
    const inputValue = this.state.inputValue;
    const filteredProducts = this.props.products.filter(product => product.title.match(inputValue))

    return (
      <div>
        <FilterInput handleChange={this.handleChange} inputValue={inputValue} />
        <Products products={filteredProducts} />
      </div>
    )
  }
}

/* ----- CONTAINER ----- */

// TODO: revisit how to pass state to props
const mapStateToProps = (state) => {
  return {
    products: state.products.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterableProducts)
