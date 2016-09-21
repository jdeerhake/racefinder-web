import { combineReducers } from 'redux'
import activeEvents from './active-events'
import events from './events'
import filter from './filter'
import highlightedEvents from './highlighted-events'
import layout from './layout'
import map from './map'
import requests from './requests'


const rootReducer = combineReducers({
  activeEvents,
  events,
  filter,
  highlightedEvents,
  layout,
  map,
  requests
})

export default rootReducer
