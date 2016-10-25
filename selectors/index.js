import { createSelector } from 'reselect'
import values from 'lodash/values'
import {
  fromEventAndZoom as createMarker,
  merge
} from '../adapters/marker'

export const getEvents = state => state.events || []

export const getMapViewport = state => state.map.viewport.toJS()

export const getMapBounds = createSelector(
  [getMapViewport],
  ({ bounds }) => bounds || {}
)

export const getMarkers = createSelector(
  [getEvents, getMapViewport],
  ( events, { zoom }) => values( events.reduce(( markers, event ) => {
    const marker = createMarker( event, zoom )
    const existing = markers[ marker.id ]
    markers[ marker.id ] = existing ? merge( marker, existing ) : marker
    return markers
  }, {}) )
)
