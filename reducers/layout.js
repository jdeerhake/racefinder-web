import * as Actions from '../actions/index'
const initialState = {
  listWidth: 0
}

const actions = {

  [Actions.LAYOUT_CHANGE]( state, { listWidth }) {
    return {
      ...state,
      listWidth
    }
  },

}

export default function layout( state = initialState, action ) {
  const reduce = actions[action.type]
  return reduce ? reduce(state, action) : state
}
