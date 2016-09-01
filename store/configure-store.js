import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const loggerMiddleware = createLogger()
const enhancer = compose(
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    enhancer
  )
}
