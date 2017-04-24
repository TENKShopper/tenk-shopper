import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  products: require('./products-reducer').default,
  selectedProduct: require('./selectedProduct-reducer').default,
  auth: require('./auth-reducer').default
})

export default rootReducer
