import moment from 'moment'
import Dispatcher from '../dispatchers/racefinder-dispatcher'
import Store from '../lib/store'

let store = Store( Dispatcher, {} )

store.add( 'dateRanges', [
  { text: 'This month',      val: [ moment(), moment().endOf( 'month' ) ]},
  { text: 'This year',       val: [ moment(), moment().endOf( 'year' ) ]},
  { text: 'Within 3 months', val: [ moment(), moment().add( 3, 'months' ) ]},
  { text: 'Within 6 months', val: [ moment(), moment().add( 6, 'months' ) ]},
  { text: 'Within a year',   val: [ moment(), moment().add( 1, 'year' ) ]}
])

store.add( 'raceTypes', [
  { text: 'Any',       val: '' },
  { text: 'Run',       val: 'run' },
  { text: 'Bike',      val: 'bike' },
  { text: 'Triathlon', val: 'triathlon' },
  { text: 'Adventure/Obstacle', val: 'adventure' }
])

export default store