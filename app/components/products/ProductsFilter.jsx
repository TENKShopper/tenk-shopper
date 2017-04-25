import React, { Component } from 'react'

export default class ProductsFilter extends Component {
  render() {
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
              onChange={this.props.handleInputChange}
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
              onChange={this.props.handleInputChange}
            >
              <option value="All" key='all'>Show all</option>
              {this.props.collections.map(collection =>
                <option value={collection} key={collection}>{collection}</option>)
              }
            </select>
          </div>
        </div>
      </div>
    )
  }
}
