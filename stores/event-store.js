import keyBy from 'lodash/keyBy'
import Dispatcher from '../dispatchers/racefinder-dispatcher.js'
import Store from '../lib/store'

const store = Store( Dispatcher, {} )

store.handle( 'event_add', function ( payload ) {
  return this.add( payload.event.id, payload.event )
})

store.handle( 'event_reset', function ( payload ) {
  return this.replace( keyBy( payload.events, 'id' ) )
})

store.handle( 'event_remove', function( payload ) {
  return this.remove( payload.eventID )
})

export default store
