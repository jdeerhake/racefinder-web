import Dispatcher from '../dispatchers/racefinder-dispatcher'
import Store from '../lib/store'
import FilterOptsStore from './filter-options-store'

let store = Store( Dispatcher, {} )
let filters = FilterOptsStore.getAll()

store.add( 'raceType', filters.raceTypes[0].val )
store.add( 'dateRange', filters.dateRanges[2].val )
store.add( 'query', '' )

store.handle( 'map_change_bounds', function( payload ) {
  let bounds = payload.bounds
  return [
    this.addOrSet( 'n', bounds.n ),
    this.addOrSet( 's', bounds.s ),
    this.addOrSet( 'e', bounds.e ),
    this.addOrSet( 'w', bounds.w )
  ].some( Boolean )
})

store.handle( 'filter_update_param', function( payload ) {
  return this.addOrSet( payload.key, payload.val )
})

export default store