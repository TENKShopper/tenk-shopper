import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import removeProduct from './dispatchers/removeProduct'


// we don't have api routes???



class ProductItem extends React.Component {
  constructor(props){
    super(props)
    this.removeProduct = this.removeProduct.bind(this)
  }


render(){
  const {product} = props.product
  return(
    <div className="list-group-item min-content user-item">
        <div className="media">
          <div className="media-left media-middle icon-container">
            <img className="media-object img-circle" src={product.photo} />
          </div>
          <Link
            className="media-body"
            activeClassName="active"
            to={`/products/${product.id}`}>
            <h4 className="media-heading tucked">
              <span placeholder="A product">{product.title}</span>
            </h4>
            <h5 className="tucked">
              <span>{product.price}</span>
            </h5>
          </Link>

          <div className="media-right media-middle">
            <button
                className="btn btn-default"
                onClick={this.renderRemovePanel}>
              <span className="glyphicon glyphicon-remove" />
            </button>
          </div>
          {this.props.isAdmin ? this.renderRemovePanel : null}
        </div>
  </div>
  )
}
  renderRemovePanel(event){
    event.stopPropagation()
    removeProduct(product.id)
  }
}
