import Event from '../models/event'
import RequestStatusStore from '../stores/request-status-store'
import { abortRequest } from '../lib/racefinder-api'
import Dispatcher from '../dispatchers/racefinder-dispatcher'
import { v4 as uuid } from 'node-uuid'

let EventActions = {

  search( params ) {
    RequestStatusStore.getActive().map( abortRequest )
    let id = uuid()
    Dispatcher.dispatch({
      type: 'request_replaced',
      id: id
    })

    Event.search( params, id ).then( events => {
      EventActions.resetEvents( events )
      Dispatcher.dispatch({
        type: 'request_response_received',
        id: id
      })
    })
  },

  addEvent( event ) {
    Dispatcher.dispatch({
      type: 'event_add',
      event: event
    })
  },

  resetEvents( events ) {
    Dispatcher.dispatch({
      type: 'event_reset',
      events: events
    })
  },

  removeEvent( eventID ) {
    Dispatcher.dispatch({
      type: 'event_remove',
      eventID: eventID
    })
  },

  activateEvents( eventIDs ) {
    Dispatcher.dispatch({
      type: 'event_activate',
      eventIDs: eventIDs
    })
  },

  activateEvent( eventID ) {
    Dispatcher.dispatch({
      type: 'event_activate',
      eventIDs: [eventID]
    })
  },

  deactivateEvent( eventID ) {
    Dispatcher.dispatch({
      type: 'event_deactivate',
      eventIDs: [eventID]
    })
  },

  deactivateAllEvents() {
    Dispatcher.dispatch({
      type: 'event_deactivate_all'
    })
  },

  highlightEvent( eventID ) {
    Dispatcher.dispatch({
      type: 'event_highlight',
      eventIDs: [eventID]
    })
  },

  dehighlightEvent( eventID ) {
    Dispatcher.dispatch({
      type: 'event_dehighlight',
      eventIDs: [eventID]
    })
  }

}

export default EventActions
