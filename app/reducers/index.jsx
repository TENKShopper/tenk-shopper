import { combineReducers } from 'redux'
import singleProductReducer from './singleProductReducer'
import {GET_SINGLE_PRODUCT} from '../actions/constants'

const rootReducer = combineReducers({
  singleProduct: singleProductReducer,
  auth: require('./auth').default
})

export default rootReducer
