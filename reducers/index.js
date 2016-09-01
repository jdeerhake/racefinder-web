import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import enhanceMapReducer from 'redux-map-gl'

import map from './map'
import events from './events'

const rootReducer = combineReducers({
  routing: routerReducer,
  map: enhanceMapReducer( map ),
  events
})

export default rootReducer
