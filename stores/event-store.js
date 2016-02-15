import _ from 'lodash'
import Dispatcher from '../dispatchers/racefinder-dispatcher.js'
import Store from '../lib/store'

let store = Store( Dispatcher, {

  getAllSorted() {
    return _.values( this.getAll() ).sort(( a, b ) => {
      return a.location.lat - b.location.lat ||
             a.location.lng - b.location.lng
    })
  }

})

store.handle( 'event_add', function ( payload ) {
  return this.add( payload.event.id, payload.event )
})

store.handle( 'event_reset', function ( payload ) {
  return this.replace( _.keyBy( payload.events, 'id' ) )
})

store.handle( 'event_remove', function( payload ) {
  return this.remove( payload.eventID )
})

export default store