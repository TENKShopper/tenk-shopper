import{ GET_SINGLE_PRODUCT, GET_ALL_PRODUCTS} from './constants'

// OB/IJM: `export const function` is malformed, should be `export function` or `export const whatever = function`
export const function getSingleProduct(product){
  type: GET_SINGLE_PRODUCT,
  product
}

export const function getAllProducts(products){
  type: GET_ALL_PRODUCTS,
  products
}
