import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import map from './map'
import events from './events'
import filter from './filter'
import eventsStatus from './events-status'

const rootReducer = combineReducers({
  routing: routerReducer,
  map,
  events,
  filter,
  eventsStatus
})

export default rootReducer
