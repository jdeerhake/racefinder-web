import * as Actions from '../actions/index'
import { LOCATION_CHANGE } from 'react-router-redux'
import { fromDefaults as filterOptionDefaults } from '../adapters/filter-options'
import {
  fromDefaults as filterDefaults,
  fromQueryString as filterFromQs
} from '../adapters/filter'

const initialState = {
  options: filterOptionDefaults(),
  selected: filterDefaults()
}

const actions = {

  [LOCATION_CHANGE]( state, { payload }) {
    return {
      ...state,
      selected: {
        ...initialState.selected,
        ...filterFromQs( payload.query )
      }
    }
  },

  [Actions.MAP_INITIAL_STATE]( state, { filters }) {
    return {
      ...state,
      selected: {
        ...initialState.selected,
        ...filters
      }
    }
  }

}

export default function events( state = initialState, action ) {
  const reduce = actions[ action.type ]
  return reduce ? reduce( state, action ) : state
}
