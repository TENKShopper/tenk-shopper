import axios from 'axios'

import { updateUser } from './users-reducer'

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

export const fetchPendingOrder = (order, product, userId) => dispatch => {
  axios.get('/api/userSessions/', {pendingOrder: order})
    .then(res => dispatch(addToCart(res.data)))
    .catch(err => console.error('Failed to add to cart:', err))
}

export const createPendingOrder = (order, product, userId) => dispatch => {
  axios.post('/api/userSessions/', {pendingOrder: order})
    .then(res => dispatch(addToCart(res.data)))
    .catch(err => console.error('Failed to add to cart:', err))
}
