import Dispatcher from '../dispatchers/racefinder-dispatcher.js'
import Store from '../lib/store'
import StatusStore from '../lib/status-store'

let store = Store( Dispatcher, StatusStore( 'active' ) )

store.handle( 'request_made', payload => {
  return store.addActive( payload.id )
})

store.handle( 'request_replaced', payload => {
  return store.replaceActive( payload.id )
})

store.handle( 'request_response_received', payload => {
  return store.removeActive( payload.id )
})

store.handle( 'request_cancelled', payload => {
  return store.removeActive( payload.id )
})

export default store