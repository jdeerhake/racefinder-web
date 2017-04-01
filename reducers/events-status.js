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

  [Actions.MAP_CHANGE_VIEWPORT]() {
    return {
      ...initialState
    }
  }

}

export default function events( state = initialState, action ) {
  const reduce = actions[ action.type ]
  return reduce ? reduce( state, action ) : state
}
