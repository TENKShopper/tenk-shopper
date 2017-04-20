import {GET_SINGLE_PRODUCT} from '../actions/constants'

export default function(state= {}, action){
  switch(action.type){
    case GET_SINGLE_PRODUCT: return action.selectedProduct;
    default: return state;
  }
}
