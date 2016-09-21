import * as Actions from '../actions/index'
import without from 'lodash/without'

const initialState = []

const reset = () => []

const actions = {

  [Actions.EVENT_ACTIVATE]( state, { eventIDs }) {
    return [ ...eventIDs ]
  },

  [Actions.EVENT_DEACTIVATE]( state, { eventIDs }) {
    return without( state, eventIDs )
  },

  [Actions.EVENT.DEACTIVATE_ALL]: reset,

  [Actions.MAP_CLICK]: reset,

  [Actions.MAP_CHANGE_BOUNDS]: reset,

  [Actions.FILTER_UPDATE_PARAM]: reset
}

export default function activeEvents( state = initialState, action ) {
  const reduce = actions[action.type]
  return reduce ? reduce(state, action) : state
}
