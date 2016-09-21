import * as Actions from '../actions/index'
import { abortRequest } from '../lib/racefinder-api'

const initialState = {}

const actions = {

  [Actions.REQUEST_MADE]( state, { id, requestType }) {
    const current = state[requestType]
    if(state[requestType]) {
      //Be smarter here
      abortRequest( current )
    }

    return {
      ...state,
      [requestType]: id
    }
  },

  [Actions.REQUEST_SUCCESS]( state, { requestType }) {
    return {
      ...state,
      [requestType]: undefined
    }
  },

  [Actions.REQUEST_ERROR]( state, { requestType, id, error }) {
    // here too
    console.error( `Request error: ${error} for request ${id}` )
    return {
      ...state,
      [requestType]: undefined
    }
  }


}

export default function requests( state = initialState, action ) {
  const reduce = actions[action.type]
  return reduce ? reduce(state, action) : state
}
