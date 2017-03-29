import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import map from './map'
import events from './events'

const rootReducer = combineReducers({
  routing: routerReducer,
  map,
  events
})

export default rootReducer
