import { createSelector } from 'reselect'
import values from 'lodash/values'
import { fromEventAndZoom as createMarker, merge } from '../adapters/marker'
import { fromPathName as filterPresetFromPath } from '../adapters/filter-preset'
import { fromPathName as marketFromPath } from '../adapters/market'
import {
  fromQueryString as filtersFromQs,
  fromDefaults as filterDefaults
} from '../adapters/filter'

export const getEvents = state => state.events

export const getMapViewport = state => state.map.viewport

export const getInitialViewport = state => state.map.initialViewport

export const getMapBounds = state => state.map.boundsGetter()

export const getEventsStatus = state => state.eventsStatus

export const getMapZoom = createSelector(
  [ getMapViewport, getInitialViewport ],
  ( viewport, initialViewport ) => viewport.zoom || initialViewport.zoom
)

export const getEventList = createSelector(
  [ getEvents ],
  ( events ) => values( events )
)

export const getEventsWithStatus = createSelector(
  [ getEvents, getEventsStatus ],
  ( events, { highlighted, active }) => {
    const newEvents = { ...events }

    highlighted.forEach( id => {
      newEvents[ id ] = {
        ...newEvents[ id ],
        highlighted: true
      }
    }, {})

    active.forEach( id => {
      newEvents[ id ] = {
        ...newEvents[ id ],
        active: true
      }
    }, {})

    return values( newEvents ).sort(( a, b ) => {
      return a.location.lat - b.location.lat || a.location.lng - b.location.lng
    })
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

const getLocation = state => state.routing.locationBeforeTransitions

export const getFilterPreset = createSelector(
  [ getLocation ],
  ({ pathname }) => filterPresetFromPath( pathname )
)

export const getSelectedMarket = createSelector(
  [ getLocation ],
  ({ pathname }) => marketFromPath( pathname )
)

const getFilterPresetFilters = createSelector(
  [ getFilterPreset ],
  ( fp ) => fp ? fp.filters : {}
)

const getQsFilters = createSelector(
  [ getLocation ],
  ({ query }) => filtersFromQs( query )
)

export const getFilters = createSelector(
  [ getQsFilters, getFilterPresetFilters, filterDefaults ],
  ( qsFilters, presetFilters, defaultFilters ) => ({
    ...defaultFilters,
    ...presetFilters,
    ...qsFilters
  })
)
