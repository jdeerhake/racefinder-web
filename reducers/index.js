import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import enhanceMapReducer from 'redux-map-gl'

import map from './map'

const rootReducer = combineReducers({
  routing: routerReducer,
  map: enhanceMapReducer( map )
})

export default rootReducer
