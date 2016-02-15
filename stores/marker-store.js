import _ from 'lodash'
import EventStore from './event-store'
import MapStore from './map-store'
import Dispatcher from '../dispatchers/racefinder-dispatcher'
import Marker from '../models/marker'
import Store from '../lib/store'

let store = Store( Dispatcher, {

  getIDFromEvent: function( eventID ) {
    return this._byEvent[ eventID ].id
  },

  getIDsFromEvents: function( eventIDs ) {
    return _.uniq( eventIDs.map( this.getIDFromEvent ) )
  },

  addFromEvent: function( event, zoom ) {
    var marker = Marker( event.location.lat, event.location.lng, zoom )
    marker.addEvent( event.id )
    return this.addOrJoin( marker.id, marker )
  },

  removeEvent: function( eventID ) {
    var marker = this._byEvent[ eventID ]
    if( marker ) {
      delete this._byEvent[ eventID ]
      marker.removeEvent( eventID )
      if( marker.isEmpty() ) { this.remove( marker.id ) }
      return true
    }
  },

  remove: function( id ) {
    if( this.get( id ) ) {
      delete this._items[ id ]
      Array( this._highlighted, this._active ).map( _.partialRight( _.pull, id ) )
      return true
    }
  },

  addOrJoin: function( id, newMarker ) {
    var events = newMarker.events
    this.add( id, newMarker )
    var marker = this.get( id )
    events.map( eventID => {
      marker.addEvent( eventID )
      this._byEvent[ eventID ] = marker
    })
    return true
  },

  reset: function() {
    this._byEvent = {}
    this._items = {}
    return true
  }

})

store.reset()

store.handle( 'event_add', function( payload ) {
  return this.addFromEvent( payload.event, MapStore.get( 'zoom' ) )
})

store.handle( 'event_remove', function( payload ) {
  return this.removeEvent( payload.eventID )
})

store.handle([
  'event_reset',
  'map_change_zoom'
], function() {
  Dispatcher.waitFor([ EventStore.token ])
  var zoom = MapStore.get( 'zoom' )
  this.reset()
  _.map( EventStore.getAll(), _.partial( this.addFromEvent, _, zoom ) )
  return true
})

export default store