import HighlightedEventStore from './highlighted-event-store'
import MarkerStore from './marker-store'
import Dispatcher from '../dispatchers/racefinder-dispatcher'
import Store from '../lib/store'
import StatusStore from '../lib/status-store'

let store = Store( Dispatcher, StatusStore( 'highlighted' ) )

store.handle([
  'event_highlight',
  'event_dehighlight'
], function() {
  Dispatcher.waitFor([ HighlightedEventStore.token ])
  return this.replaceHighlighted( MarkerStore.getIDsFromEvents( HighlightedEventStore.getHighlighted() ) )
})

store.handle([
  'event_reset',
  'map_change_zoom'
], function() {
  return this.resetHighlighted()
})

export default store