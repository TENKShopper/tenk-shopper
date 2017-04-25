import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'


export default class ProductItem extends Component {
  constructor() {
    super()
    this.renderRemoveProduct = this.renderRemoveProduct.bind(this)
  }
  render() {
    const product = this.props.product
    return (
      <div className="list-group-item min-content product-item">
        <div className="media">
          <div className="media-left media-middle icon-container">
            <img className="media-object img-circle product-list-photo" src={product.photos[0]} />
          </div>
          <Link
            className="media-body"
            activeClassName="active"
            to={`/products/${product.id}`}
          >
              <h4 className="media-heading tucked">
                <span placeholder="A product">{product.name}</span>
              </h4>
              <h5 className="tucked">
                <span>${product.price}</span>
              </h5>
          </Link>
          <button>

          </button>
        </div>

        {this.props.isAdmin ? this.renderRemoveProduct() : null}

      </div>
    )
  }

  renderRemoveProduct() {
    return (
      <div className="media-right media-middle">
        <button
          className="btn btn-default"
          // onClick={removeProduct(product.id)}>
        >
          <span className="glyphicon glyphicon-remove" />
        </button>
      </div>
    )
  }

}
