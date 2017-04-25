import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'


/* ------------   ACTION CREATORS     ------------------ */

const selectProduct = selectedProduct => ({ type: GET_SINGLE_PRODUCT, selectedProduct})


/* ------------       REDUCER     ------------------ */

export default (selectedProduct = {}, action) => {
  switch (action.type) {

    case GET_SINGLE_PRODUCT:
      return action.selectedProduct

    default:
      return selectedProduct

  }
}


/* ------------       DISPATCHERS     ------------------ */

export const fetchSelectedProduct = id => dispatch => {
  axios.get(`/api/products/${id}`)
      .then(res => dispatch(selectProduct(res.data)))
}
