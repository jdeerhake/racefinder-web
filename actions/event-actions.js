import Event from '../models/event'
import RequestStatusStore from '../stores/request-status-store'
import { abortRequest } from '../lib/racefinder-api'
import { v4 as uuid } from 'node-uuid'

import {
  REQUEST_REPLACED,
  REQUEST_RESPONSE_RECEIVED,
  REQUEST_ERROR,
  EVENT_ADD,
  EVENT_RESET,
  EVENT_REMOVE,
  EVENT_ACTIVATE,
  EVENT_DEACTIVATE,
  EVENT_DEACTIVATE_ALL,
  EVENT_HIGHLIGHT,
  EVENT_DEHIGHLIGHT
} from './index'

export const search = params => dispatch => {
  const id = uuid()
  RequestStatusStore.getActive().map( abortRequest )
  dispatch({ type: REQUEST_REPLACED, id })
  Event.search( params, id ).then( events => {
    resetEvents( events )
    dispatch({ type: REQUEST_RESPONSE_RECEIVED, id })
  }, error => {
    dispatch({ type: REQUEST_ERROR, error, id })
  })
}

export const addEvent = event => ({ type: EVENT_ADD, event })

export const resetEvents = events => ({ type: EVENT_RESET, events })

export const removeEvent = eventID => ({ type: EVENT_REMOVE, eventID })

export const activateEvents = eventIDs => ({ type: EVENT_ACTIVATE, eventIDs })

export const activateEvent = eventID => ({ type: EVENT_ACTIVATE, eventIDs: [eventID] })

export const deactivateEvent = eventID => ({ type: EVENT_DEACTIVATE, eventIDs: [eventID] })

export const deactivateAllEvents = () => ({ type: EVENT_DEACTIVATE_ALL })

export const highlightEvent = eventID => ({ type: EVENT_HIGHLIGHT, eventIDs: [eventID] })

export const dehighlightEvent = eventID => ({ type: EVENT_DEHIGHLIGHT, eventIDs: [eventID] })
