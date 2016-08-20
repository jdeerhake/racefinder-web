import HighlightedEventStore from './highlighted-event-store'
import MarkerStore from './marker-store'
import Dispatcher from '../dispatchers/racefinder-dispatcher'
import Store from '../lib/store'
import StatusStore from '../lib/status-store'

const store = Store( Dispatcher, StatusStore( 'highlighted' ) )

store.handle([
  'event_highlight',
  'event_dehighlight'
], function() {
  Dispatcher.waitFor([ HighlightedEventStore.token ])
  return this.replaceHighlighted( MarkerStore.getIDsFromEvents( HighlightedEventStore.getHighlighted() ) )
})

store.handle([
  'event_reset',
  'map_change_zoom',
  'filter_update_param'
], function() {
  return this.resetHighlighted()
})

export default store
