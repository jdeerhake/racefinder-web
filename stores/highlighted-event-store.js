import Dispatcher from '../dispatchers/racefinder-dispatcher.js'
import Store from '../lib/store'
import StatusStore from '../lib/status-store'

const store = Store( Dispatcher, StatusStore( 'highlighted' ) )

store.handle( 'event_highlight', function( payload ) {
  return this.replaceHighlighted( payload.eventIDs )
})

store.handle( 'event_dehighlight', function( payload ) {
  return payload.eventIDs.map( this.removeHighlighted ).some( Boolean )
})

export default store
