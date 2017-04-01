import { createSelector } from 'reselect'
import values from 'lodash/values'
import { fromEventAndZoom as createMarker, merge } from '../adapters/marker'

export const getEvents = state => state.events

export const getMapViewport = state => state.map.viewport

export const getMapBounds = state => state.map.boundsGetter()

export const getEventsStatus = state => state.eventsStatus

export const getEventsWithStatus = createSelector(
  [ getEvents, getEventsStatus ],
  ( events, { highlighted, active }) => {
    const newEvents = {
      ...events,
      ...highlighted.reduce(( out, id ) => {
        out[ id ] = { ...events[ id ], highlighted: true }
        return out
      }, {}),
      ...active.reduce(( out, id ) => {
        out[ id ] = { ...events[ id ], active: true }
        return out
      }, {})
    }

    return values( newEvents )
  }
)

export const getMarkers = createSelector(
  [ getEventsWithStatus, getMapViewport ],
  ( events, { zoom }) => values( events.reduce(( markers, event ) => {
    const marker = createMarker( event, zoom )
    const existing = markers[ marker.id ]
    markers[ marker.id ] = existing ? merge( marker, existing ) : marker
    return markers
  }, {}) )
)
