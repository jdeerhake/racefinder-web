import * as Actions from '../actions/index'

const initialState = {}

const actions = {

  [Actions.MAP_CHANGE_VIEWPORT]( state, { viewport }) {
    return {
      ...state,
      viewport: state.viewport.merge( viewport )
    }
  }

}

export default function map( state = initialState, action ) {
  const reduce = actions[ action.type ]
  return reduce ? reduce( state, action ) : state
}
