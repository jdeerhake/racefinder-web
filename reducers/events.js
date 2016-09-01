import * as Actions from '../actions/index'

const initialState = []

const actions = {

  [Actions.EVENTS_REPLACE]( state, { events }) {
    return [ ...events ]
  }

}

export default function events( state = initialState, action ) {
  const reduce = actions[ action.type ]
  return reduce ? reduce( state, action ) : state
}
