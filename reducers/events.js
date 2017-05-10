import keyBy from 'lodash/keyBy'
import pick from 'lodash/pick'
import map from 'lodash/map'
import * as Actions from '../actions/index'

const initialState = {}

const actions = {

  [Actions.EVENTS_REPLACE]( state, { events }) {
    return {
      ...keyBy( events, 'id' ),
      ...pick( state, map( events, 'id' ) )
    }
  }

}

export default function events( state = initialState, action ) {
  const reduce = actions[ action.type ]
  return reduce ? reduce( state, action ) : state
}
