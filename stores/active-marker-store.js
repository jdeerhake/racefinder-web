import ActiveEventStore from './active-event-store'
import MarkerStore from './marker-store'
import Dispatcher from '../dispatchers/racefinder-dispatcher'
import Store from '../lib/store'
import StatusStore from '../lib/status-store'

let store = Store( Dispatcher, StatusStore( 'active' ) )

store.handle([
  'event_activate',
  'event_deactivate'
], function() {
  Dispatcher.waitFor([ ActiveEventStore.token ])
  return this.replaceActive( MarkerStore.getIDsFromEvents( ActiveEventStore.getActive() ) )
})

store.handle([
  'event_deactivate_all',
  'map_click',
  'map_change_bounds',
  'map_change_zoom',
  'filter_update_param'
], function() {
  return this.resetActive()
})

export default store