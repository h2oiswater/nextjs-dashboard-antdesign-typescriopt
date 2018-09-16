import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import initState from './initState'

export function initializeStore (initialState = initState) {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(thunk)
  )
}