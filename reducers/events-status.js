import map from 'lodash/map'
import intersection from 'lodash/intersection'
import * as Actions from '../actions/index'

const initialState = {
  highlighted: [],
  active: []
}

const actions = {

  [Actions.EVENTS_ACTIVATE]( state, { eventIDs }) {
    return {
      active: [ ...eventIDs ],
      highlighted: []
    }
  },

  [Actions.EVENTS_HIGHLIGHT]( state, { eventIDs }) {
    return {
      ...state,
      highlighted: [ ...eventIDs ]
    }
  },

  [Actions.EVENTS_REPLACE]( state, { events }) {
    const ids = map( events, 'id' )

    return {
      highlighted: intersection( state.highlighted, ...ids ),
      active: intersection( state.active, ...ids )
    }
  },

  [Actions.MAP_MOVE]() {
    return {
      ...initialState
    }
  }

}

export default function events( state = initialState, action ) {
  const reduce = actions[ action.type ]
  return reduce ? reduce( state, action ) : state
}
