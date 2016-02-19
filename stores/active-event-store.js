import Dispatcher from '../dispatchers/racefinder-dispatcher.js'
import Store from '../lib/store'
import StatusStore from '../lib/status-store'

let store = Store( Dispatcher, StatusStore( 'active' ) )

store.handle( 'event_activate', function( payload ) {
  return this.replaceActive( payload.eventIDs )
})

store.handle( 'event_deactivate', function( payload ) {
  return payload.eventIDs.map( this.removeActive ).some( Boolean )
})

store.handle([
  'map_click',
  'map_change_bounds',
  'event_deactivate_all'
], function() {
  return this.resetActive()
})

export default store