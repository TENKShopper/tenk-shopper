// OB/IJM: file naming conventions (dash v camel case)
import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE    = 'INITIALIZE_PRODUCTS'
const CREATE        = 'CREATE_PRODUCT'
export const REMOVE = 'REMOVE_PRODUCT'
const UPDATE        = 'UPDATE_PRODUCT'


/* ------------   ACTION CREATORS     ------------------ */

const init   = products => ({ type: INITIALIZE, products })
export const create = product => ({ type: CREATE, product })
const remove = id    => ({ type: REMOVE, id })
const update = product  => ({ type: UPDATE, product })


/* ------------       REDUCER     ------------------ */

// OB/IJM: recommend immutable.js, https://facebook.github.io/immutable-js/docs/
export default reducer = (products = [], action) => {
  switch (action.type) {
    case INITIALIZE:
      return action.products

    case CREATE:
      return [action.product, ...products]

    case REMOVE:
      return products.filter(product => product.id !== action.id)

    case UPDATE:
      return products.map(product => (
        action.product.id === product.id ? action.product : product
      ))

    default:
      return products
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const fetchProducts = () => dispatch => {
  axios.get('/api/products')
       .then(res => dispatch(init(res.data)))
}

// optimistic
export const removeProduct = id => dispatch => {
  dispatch(remove(id))
  axios.put(`/api/products/${id}`, { available: false }) // OB/IJM: maybe roll this into the updateProduct below
       .catch(err => console.error(`Making product #${id} unavailable was unsuccesful`, err))
}

export const addProduct = product => dispatch => {
  axios.post('/api/products', product)
       .then(res => dispatch(create(res.data)))
       .catch(err => console.error(`Creating product: ${product} unsuccesful`, err)) // OB/IJM: https://tomchentw.github.io/react-toastr/
}

export const updateProduct = (id, product) => dispatch => {
  axios.put(`/api/products/${id}`, product)
       .then(res => dispatch(update(res.data)))
       .catch(err => console.error(`Updating product: ${product} unsuccesful`, err))
}
