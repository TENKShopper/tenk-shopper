import{ GET_SINGLE_PRODUCT, GET_ALL_PRODUCTS} from './constants'


export const function getSingleProduct(product){
  type: GET_SINGLE_PRODUCT,
  product
}

export const function getAllProducts(products){
  type: GET_ALL_PRODUCTS,
  products
}
