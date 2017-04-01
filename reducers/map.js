import * as Actions from '../actions/index'

const initialState = {
  initialViewport: {
    zoom: 12,
    latitude: 34.015,
    longitude: -118.482
  },
  viewport: {},
  boundsGetter: () => ({})
}

const actions = {

  [Actions.MAP_INIT]( state, { boundsGetter }) {
    return {
      ...state,
      boundsGetter
    }
  },

  [Actions.MAP_INITIAL_STATE]( state, { viewport }) {
    return {
      ...state,
      initialViewport: viewport
    }
  },

  [Actions.MAP_MOVE]( state, { viewport }) {
    return {
      ...state,
      viewport
    }
  }

}

export default function map( state = initialState, action ) {
  const reduce = actions[ action.type ]
  return reduce ? reduce( state, action ) : state
}
