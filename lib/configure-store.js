import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const loggerMiddleware = createLogger()
const enhancer = compose(
  applyMiddleware( loggerMiddleware )
)

export default function configureStore( initialState ) {
  return createStore(
    rootReducer,
    initialState,
    enhancer
  )
}
