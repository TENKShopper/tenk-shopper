import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  products: require('./products-reducer').default,
  user: require('./users-reducer').default,
  // selectedProduct: require('./selectedProduct-reducer').default,
  auth: require('./auth-reducer').default,
  cart: require('./pendingOrders-reducer').default,
})

export default rootReducer
