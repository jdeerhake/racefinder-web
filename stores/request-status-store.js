import Dispatcher from '../dispatchers/racefinder-dispatcher.js'
import Store from '../lib/store'
import StatusStore from '../lib/status-store'

let store = Store( Dispatcher, StatusStore( 'active' ) )

store.handle( 'request_made', function( payload ) {
  return store.addActive( payload.id )
})

store.handle( 'request_replaced', function( payload ) {
  return store.replaceActive( payload.id )
})

store.handle( 'request_response_received', function( payload ) {
  return store.removeActive( payload.id )
})

store.handle( 'request_cancelled', function( payload ) {
  return store.removeActive( payload.id )
})

export default store