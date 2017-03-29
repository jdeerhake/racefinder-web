import * as Actions from '../actions/index'

const initialState = {
  viewport: {
    isDragging: false,
    startDragLngLat: null,
    zoom: 12,
    latitude: 34.015,
    longitude: -118.482
  },
  boundsGetter: () => ({})
}

const actions = {

  [Actions.MAP_CHANGE_VIEWPORT]( state, { viewport }) {
    return {
      ...state,
      viewport: {
        ...state.viewport,
        ...viewport
      }
    }
  },

  [Actions.MAP_INIT]( state, { boundsGetter }) {
    return {
      ...state,
      boundsGetter
    }
  }

}

export default function map( state = initialState, action ) {
  const reduce = actions[ action.type ]
  return reduce ? reduce( state, action ) : state
}
