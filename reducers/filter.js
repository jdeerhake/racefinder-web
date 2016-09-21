import moment from 'moment'

const initialState = {
  dateRanges: [
    { text: 'This month',      val: [ moment(), moment().endOf( 'month' ) ]},
    { text: 'This year',       val: [ moment(), moment().endOf( 'year' ) ]},
    { text: 'Within 3 months', val: [ moment(), moment().add( 3, 'months' ) ]},
    { text: 'Within 6 months', val: [ moment(), moment().add( 6, 'months' ) ]},
    { text: 'Within a year',   val: [ moment(), moment().add( 1, 'year' ) ]}
  ],
  types: [
    { text: 'Any',       val: '' },
    { text: 'Run',       val: 'run' },
    { text: 'Bike',      val: 'bike' },
    { text: 'Triathlon', val: 'triathlon' },
    { text: 'Adventure/Obstacle', val: 'adventure' }
  ]
}

const actions = {}

export default function filter( state = initialState, action ) {
  const reduce = actions[action.type]
  return reduce ? reduce(state, action) : state
}
