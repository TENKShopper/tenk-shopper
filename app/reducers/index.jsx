import { combineReducers } from 'redux'
import singleProductReducer from './singleProductReducer'
import allProductsReducer from './allProductsReducer'
import {GET_SINGLE_PRODUCT} from '../actions/constants'

const rootReducer = combineReducers({
  singleProduct: singleProductReducer,
  allProductsReducer: allProductsReducer,
  auth: require('./auth').default
})

export default rootReducer
