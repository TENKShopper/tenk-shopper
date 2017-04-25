import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import { whoami } from './reducers/auth-reducer'

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      createLogger({collapsed: true}), // OB/DY: might want to have these middleware reversed
      thunkMiddleware
    )
  )
)

export default store

// Consider moving this to an onEnter hook for the entire app
// Set the auth info at start
store.dispatch(whoami())
