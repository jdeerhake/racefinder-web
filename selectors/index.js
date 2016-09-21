import { createSelector } from 'reselect'
import values from 'lodash/values'
import Marker from '../models/marker'

const getEvents = state => state.events
const getMap = state => state.map
const getHighlightedEvents = state => state.highlightedEvents
const getActiveEvents = state => state.activeEvents

export const getMarkers = createSelector(
  [ getEvents, getMap ],
  ( events, map ) => values( events ).reduce(( markers, event ) => {
    const { lat, lng } = event.location
    const { zoom } = map

    let marker = new Marker({ lat, lng, zoom })

    if(!markers[marker.id]) {
      markers[marker.id] = marker
    }

    markers[marker.id].addEvent( event.id )

    return markers
  }, {})
)


export const getHighlightedMarkers = createSelector(
  [ getMarkers, getHighlightedEvents ],
  ( markers, highlightedEvents ) => values( markers ).filter( marker  => {
    return highlightedEvents.some( marker.hasEvent )
  }).map( marker => marker.id )
)


export const getActiveMarkers = createSelector(
  [ getMarkers, getActiveEvents ],
  ( markers, activeEvents ) => values( markers ).filter( marker  => {
    return activeEvents.some( marker.hasEvent )
  }).map( marker => marker.id )
)
