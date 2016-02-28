import _ from 'lodash'
import { params, overrideParams } from '../lib/history'
import Dispatcher from '../dispatchers/racefinder-dispatcher'
import Store from '../lib/store'
import FilterOptsStore from './filter-options-store'

const store = Store( Dispatcher, {} )
const filters = FilterOptsStore.getAll()

const selectedType = _.find( filters.types, { val: params().type }) || filters.types[0]
const selectedDates = filters.dateRanges[ params().dateRange ] || filters.dateRanges[2]
const query = params().query || ''

store.add( 'type', selectedType.val )
store.add( 'dateRange', selectedDates.val )
store.add( 'query', query )

store.handle( 'map_change_bounds', function({ bounds }) {
  const { n, s, e, w } = bounds
  return [
    this.addOrSet( 'n', n ),
    this.addOrSet( 's', s ),
    this.addOrSet( 'e', e ),
    this.addOrSet( 'w', w )
  ].some( Boolean )
})

store.handle( 'map_change_center', ({ center }) => {
  overrideParams( center )
  return false
})

store.handle( 'map_change_zoom', ({ zoom }) => {
  overrideParams({ zoom })
  return false
})

store.handle( 'filter_update_param', function({ key, val }) {
  if( key === 'dateRange' ) {
    const index = _.findIndex( filters.dateRanges, { val })
    overrideParams({ dateRange: index })
  } else {
    overrideParams({ [key]: val })
  }
  return this.addOrSet( key, val )
})

export default store