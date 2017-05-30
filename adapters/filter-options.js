import moment from 'moment'

export const DATE_RANGES = [
  // { text: 'This month',      val: [ moment(), moment().endOf( 'month' ) ]},
  // { text: 'This year',       val: [ moment(), moment().endOf( 'year' ) ]},
  { text: 'Within 3 months', val: [ moment(), moment().add( 3, 'months' ) ]},
  { text: 'Within 6 months', val: [ moment(), moment().add( 6, 'months' ) ]},
  { text: 'Within a year',   val: [ moment(), moment().add( 1, 'year' ) ]}
]

export const RACE_TYPES = [
  { text: 'Any',       val: '' },
  { text: 'Run',       val: 'run' },
  { text: 'Bike',      val: 'bike' },
  { text: 'Triathlon', val: 'triathlon' },
  { text: 'Adventure/Obstacle', val: 'adventure' },
  { text: 'Swimming & water sports', val: 'swim' }
]

export const ALL_RACE_TYPES = RACE_TYPES.map( defn => defn.val ).filter( Boolean )

export const fromDefaults = () => ({
  dateRanges: DATE_RANGES,
  raceTypes: RACE_TYPES
})
