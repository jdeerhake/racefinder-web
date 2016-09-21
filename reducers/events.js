import * as Actions from '../actions/index'
import keyBy from 'lodash/keyBy'

const initialState = {}

const actions = {

  [Actions.EVENT_ADD]( state, { event }) {
    return {
      ...state,
      [event.id]: event
    }
  },

  [Actions.EVENT_REMOVE]( state, { event }) {
    return {
      ...state,
      [event.id]: undefined
    }
  },

  [Actions.EVENT_RESET]( state, { events }) {
    return keyBy( events, 'id' )
  },

}

export default function events( state = initialState, action ) {
  const reduce = actions[action.type]
  return reduce ? reduce(state, action) : state
}
