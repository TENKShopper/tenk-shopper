import React, { Component } from 'react'
import { connect } from 'react-redux'

import RefineProductCheckboxes from './RefineProductCheckboxes'

export default class RefineProductSelection extends Component {
  render() {
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
            <RefineProductCheckboxes key={label} field='gender' toggleCheckbox={this.props.toggleCheckbox} label={label} />
          ))}
          <h5>Clothing Type</h5>
          {['Shirts', 'Pants', 'Shoes'].map(label => (
            <RefineProductCheckboxes key={label} field='type' toggleCheckbox={this.props.toggleCheckbox} label={label} />
          ))}
          <h5>Size</h5>
          {['Small', 'Medium', 'Large'].map(label => (
            <RefineProductCheckboxes key={label} field='size' toggleCheckbox={this.props.toggleCheckbox} label={label} />
          ))}
        </form>
      </div>
    )
  }
}
