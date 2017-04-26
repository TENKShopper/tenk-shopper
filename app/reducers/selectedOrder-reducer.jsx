import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'

/* ------------   ACTION CREATORS     ------------------ */

const selectOrder = selectedOrder => ({ type: GET_SINGLE_ORDER, selectedOrder })

/* ------------       REDUCER     ------------------ */

export default (selectedOrder = {}, action) => {
  switch (action.type) {
  case GET_SINGLE_ORDER:
    return action.selectedOrder

  default:
    return selectedOrder
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchSelectedOrder = id => dispatch => {
  axios.get(`/api/orders/${id}`)
      .then(res => dispatch(selectOrder(res.data)))
}
