import Event from '../models/event'
import { v4 as uuid } from 'node-uuid'

import {
  EVENT_ADD,
  EVENT_RESET,
  EVENT_REMOVE,
  EVENT_ACTIVATE,
  EVENT_DEACTIVATE,
  EVENT_DEACTIVATE_ALL,
  EVENT_HIGHLIGHT,
  EVENT_DEHIGHLIGHT,
  REQUEST_MADE,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from './index'

export const search = params => dispatch => {
  const requestType = 'EVENT_SEARCH'
  const id = uuid()
  dispatch({ type: REQUEST_MADE, requestType, id })
  Event.search( params, id ).then( events => {
    resetEvents( events )
    dispatch({ type: REQUEST_SUCCESS, requestType, id })
  }, error => {
    dispatch({ type: REQUEST_ERROR, error, requestType, id })
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
