import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  products: require('./products-reducer').default,
  user: require('./users-reducer-temp').default,
  // selectedProduct: require('./selectedProduct-reducer').default,
  auth: require('./auth-reducer').default,
  cart: require('./pendingOrder-reducer-temp').default,
})

export default rootReducer
