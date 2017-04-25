import React, { Component } from 'react'

export default class RefineProductCheckboxes extends Component {
  render() {
    const label = this.props.label
        , field = this.props.field
        , toggleCheckbox = this.props.toggleCheckbox
    return (
      <div className="product-selector" key={label}>
        <label>{label}</label>
        <input
          name={field}
          type="checkbox"
          value={label}
          className="product-selection-checkbox"
          onChange={toggleCheckbox}
        />
      </div>
    )
  }
}
