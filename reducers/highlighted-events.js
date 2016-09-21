import * as Actions from '../actions/index'
import without from 'lodash/without'

const initialState = []

const actions = {

  [Actions.EVENT_HIGHLIGHT]( state, { eventIDs }) {
    return [ ...eventIDs ]
  },

  [Actions.EVENT_DEHIGHLIGHT]( state, { eventIDs }) {
    return without( state, eventIDs )
  }

}

export default function highlightedEvents( state = initialState, action ) {
  const reduce = actions[action.type]
  return reduce ? reduce(state, action) : state
}
