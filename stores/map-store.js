import Dispatcher from '../dispatchers/racefinder-dispatcher'
import Store from '../lib/store'

const store = Store( Dispatcher, {

  _items: {
    zoom: 12
  }

})

store.handle( 'map_change_bounds', payload => {
  return store.addOrSet( 'bounds', payload.bounds )
})

store.handle( 'map_change_center', payload => {
  return store.addOrSet( 'center', payload.center )
})

store.handle( 'map_change_zoom', payload => {
  return store.addOrSet( 'zoom', payload.zoom )
})

store.handle( 'map_created', payload => {
  return store.addOrSet( 'gMap', payload.gMap )
})


export default store
