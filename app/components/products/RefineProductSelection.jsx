import React, { Component } from 'react'
import { connect } from 'react-redux'

class RefineProductSelection extends Component {
  constructor(props) {
    super(props)
  }
  render() {
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
            onChange={this.handleCheckboxChange}
          />
          <label>Female</label>
          <input
            name="selectsFemale"
            type="checkbox"
            value="Female"
            onChange={this.handleCheckboxChange}
          />
          <label>Unisex</label>
          <input
            name="selectsUnisex"
            type="checkbox"
            value="Unisex"
            onChange={this.handleCheckboxChange}
          />
          <h5>Clothing Type</h5>
          <label>Shirts</label>
          <input
            name="selectsShirts"
            type="checkbox"
            value="Shirts"
            onChange={this.handleCheckboxChange}
          />
          <label>Pants</label>
          <input
            name="selectsPants"
            type="checkbox"
            value="pants"
            onChange={this.handleCheckboxChange}
          />
          <label>Shoes</label>
          <input
            name="selectsShoes"
            type="checkbox"
            value="Shoes"
            onChange={this.handleCheckboxChange}
          />
          <h5>Size</h5>
          <label>S</label>
          <input
            name="selectsSmall"
            type="checkbox"
            value="Small"
            onChange={this.handleCheckboxChange}
          />
          <label>M</label>
          <input
            name="selectsMedium"
            type="checkbox"
            value="Medium"
            onChange={this.handleCheckboxChange}
          />
          <label>L</label>
          <input
            name="selectsLarge"
            type="checkbox"
            value="Large"
            onChange={this.handleCheckboxChange}
          />
        </form>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(RefineProductSelection)
