import * as Actions from '../actions/index'
const initialState = { listWidth: 0 }

const actions = {

  [Actions.SET_HOLD]( state, { hold }) {
    return {}
  },

  [Actions.CREATE_SHORT_HOLD]( state ) {
    return {}
  }

}

export default function sections( state = initialState, action ) {
  const reduce = actions[action.type]
  return reduce ? reduce(state, action) : state
}
