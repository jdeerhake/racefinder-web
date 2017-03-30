import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import map from './map'
import events from './events'
import filter from './filter'

const rootReducer = combineReducers({
  routing: routerReducer,
  map,
  events,
  filter
})

export default rootReducer
