import React, { Component } from 'react'
import { connect } from 'react-redux'

class NewProductForm extends Component {
  constructor(props) {
    super(props)
    this.submitNewProduct = this.submitNewProduct.bind(this)
  }
  render() {
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
  // OB/DY: consider "implicit bind" (coined by Damon Ye on April 24th 2017) submitNewProduct = (event) => {...}
  submitNewProduct(event) {
    event.preventDefault()
    const product = {
      name: event.target.name.value,
    }
    this.props.addProduct(product)
  }
}

/* ----- CONTAINER ----- */

// TODO: revisit what state to pass to props
const mapStateToProps = (state) => {
  return {
    isAdmin: state.currentUser && state.currentUser.isAdmin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // addProduct
    // removeProduct
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProductForm)
