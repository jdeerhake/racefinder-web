import { createStore, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const loggerMiddleware = createLogger()
const enhancer = compose(
  applyMiddleware(
    thunkMiddleware,
    routerMiddleware( browserHistory ),
    loggerMiddleware
  )
)

export default function configureStore( initialState ) {
  return createStore(
    rootReducer,
    initialState,
    enhancer
  )
}
