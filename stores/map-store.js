import Dispatcher from '../dispatchers/racefinder-dispatcher'
import Store from '../lib/store'

let store = Store( Dispatcher, {

  _items: {
    zoom: 12
  }

})

store.handle( 'map_change_bounds', function( payload ) {
  return this.addOrSet( 'bounds', payload.bounds )
})

store.handle( 'map_change_center', function( payload ) {
  return this.addOrSet( 'center', payload.center )
})

store.handle( 'map_change_zoom', function( payload ) {
  return this.addOrSet( 'zoom', payload.zoom )
})

store.handle( 'map_created', function( payload ) {
  return this.addOrSet( 'gMap', payload.gMap )
})

export default store