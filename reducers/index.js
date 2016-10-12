import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { createViewportReducer } from 'redux-map-gl'

const rootReducer = combineReducers({
  routing: routerReducer,
  map: createViewportReducer()
})

export default rootReducer
