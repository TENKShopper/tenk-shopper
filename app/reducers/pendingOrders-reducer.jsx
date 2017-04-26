import axios from 'axios'

import { update } from './users-reducer'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE CART' // pulls all pending orders from user instance
// Either make a request upon load of page, or retrieve from users model
// Stored on session?
const ADD = 'ADD_PENDING_ORDER'
const UPDATE = 'UPDATE_PENDING_ORDER'
const REMOVE = 'REMOVE_PENDING_ORDER'
const COMPLETE_ORDER = 'COMPLETE_PRODUCT' // might be update user action

/* ------------   ACTION CREATORS     ------------------ */

const init = pendingOrders => ({type: INITIALIZE, pendingOrders})
const addToCart = order => ({type: ADD, order})
const updateOrder = order => ({type: UPDATE, order})
const removeFromCart = order => ({type: REMOVE, order})
const checkoutCart = () => ({type: COMPLETE_ORDER})

/* ------------       REDUCER     ------------------ */

export default (pendingOrders = [], action) => {
  switch (action.type) {
  case INITIALIZE:
    return action.pendingOrders

  case ADD:
    return [...pendingOrders, action.order]

  case UPDATE:
    return pendingOrders.map(order => (
      order.id !== action.order.id ? order : action.order
    ))

  case REMOVE:
    return pendingOrders.filter(order => order.id !== action.order.id)

  case COMPLETE_ORDER:
    return []

  default:
    return pendingOrders
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchPendingOrder = () => dispatch => {
  axios.get('/api/userSessions/')
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error('Failed to add to cart:', err))
}

export const createPendingOrder = (productOrder, userId) => dispatch => {
  axios.post('/api/userSessions/', {productOrder})
    .then(res => dispatch(addToCart(productOrder)))
    .catch(err => console.error('Failed to add to cart:', err))
}

export const checkoutOrder = (productOrders, orderDetail) => dispatch => {
  // also have to bulk add all the line items
  axios.all([
    axios.post('/api/users/checkoutOrders', {productOrders, orderDetail}),
    axios.delete('/api/userSessions')
  ])
    .then(res => {
      dispatch(update(res[0].data))
      dispatch(checkoutCart())
    })
    .catch(err => console.error('Failed to checkout cart', err))
}
