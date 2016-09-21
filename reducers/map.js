import * as Actions from '../actions/index'
import { params } from '../lib/history'

const initialState = {
  constructorProps: {
    zoom: parseInt( params().zoom, 10 ) || 12,
    center: {
      lat: parseFloat( params().lat ) || 34.018418,
      lng: parseFloat( params().lng ) || -118.107009
    },
    styles: require( '../lib/map-styles' )
  },
  zoom: 12
}

const actions = {

  [Actions.MAP_CHANGE_BOUNDS]( state, { bounds }) {
    return {
      ...state,
      bounds
    }
  },

  [Actions.MAP_CHANGE_CENTER]( state, { center }) {
    return {
      ...state,
      center
    }
  },

  [Actions.MAP_CHANGE_ZOOM]( state, { zoom }) {
    return {
      ...state,
      zoom
    }
  },

  [Actions.MAP_CHANGE_CREATED]( state, { gMap }) {
    return {
      ...state,
      gMap
    }
  },


}

export default function map( state = initialState, action ) {
  const reduce = actions[action.type]
  return reduce ? reduce(state, action) : state
}
