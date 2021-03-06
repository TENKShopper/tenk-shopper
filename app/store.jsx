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
      thunkMiddleware, createLogger({collapsed: true})
    )
  )
)

export default store

// Consider moving this to an onEnter hook for the entire app
// Set the auth info at start
store.dispatch(whoami())
