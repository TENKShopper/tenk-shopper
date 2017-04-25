//TODO: make this a reducer for just the "selectedProduct" part of state

import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

/* ------------   ACTION CREATORS     ------------------ */

export const selectProduct = selectedProduct => ({ type: GET_SINGLE_PRODUCT, selectedProduct})


/* ------------       REDUCER     ------------------ */





/* ------------       DISPATCHERS     ------------------ */

export const fetchProducts = () => dispatch => {
  axios.get('/api/products')
       .then(res => dispatch(init(res.data)))
}

{/* TODO: dispatch appropriate action for front-end need */}
export const fetchProduct = id => dispatch => {
  axios.get(`/api/products/${id}`)
      .then(res => dispatch())
}

export const removeProduct = id => dispatch => {
  dispatch(remove(id))
  axios.delete(`/api/product/${id}`)
    .catch(err => console.error(`Removing product: ${id} unsuccesful`, err))
}

export const addProduct = product => dispatch => {
  axios.post('/api/products', product)
       .then(res => dispatch(create(res.data)))
       .catch(err => console.error(`Creating product: ${product} unsuccesful`, err))
}

export const updateProduct = (id, product) => dispatch => {
  axios.put(`/api/products/${id}`, product)
       .then(res => dispatch(update(res.data)))
       .catch(err => console.error(`Updating product: ${product} unsuccesful`, err))
}

export const makeProductUnavailable = id => dispatch => {
  dispatch(remove(id))
  axios.put(`/api/products/${id}`, { available: false })
       .catch(err => console.error(`Making product #${id} unavailable was unsuccessful`, err))
}
