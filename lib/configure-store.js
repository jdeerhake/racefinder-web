import { createStore, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const middleware = [
  thunkMiddleware,
  routerMiddleware( browserHistory )
]

if( process.env.NODE_ENV === 'development' ) {
  middleware.push( require( 'redux-logger' )() )
}

const enhancer = compose( applyMiddleware( ...middleware ) )

export default function configureStore( initialState ) {
  return createStore(
    rootReducer,
    initialState,
    enhancer
  )
}
