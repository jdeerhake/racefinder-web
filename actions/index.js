import debounce from 'lodash/debounce'
import { replace, push } from 'react-router-redux'
import { index as searchEvents } from '../adapters/event'
import { getMapBounds, getSelectedFilters } from '../selectors/index'
import { toQueryString as filterToQs } from '../adapters/filter'

const DEFAULT_VIEWPORT_SIZE = { lat: 1.5, lng: 2 }

// Map

export const MAP_MOVE = 'MAP_MOVE'
export const MAP_INIT = 'MAP_INIT'
export const MAP_INITIAL_STATE = 'MAP_INITIAL_STATE'

export const mapMove = ( viewport ) => ( dispatch, getState ) => {
  dispatch({ type: MAP_MOVE, viewport })

  replaceURL( {
    lat: viewport.latitude.toFixed( 3 ),
    lng: viewport.longitude.toFixed( 3 ),
    zoom: viewport.zoom.toFixed( 0 ),
    ...filterToQs( getSelectedFilters( getState() ) )
  }, '/map' )( dispatch, getState )

  fetchMapEvents( dispatch, getState )
}

export const mapInitialState = ({ viewport, filters }) => ( dispatch, getState ) => {
  dispatch({ type: MAP_INITIAL_STATE, viewport, filters })
  const { latitude: lat, longitude: lng } = viewport
  const latSpread = DEFAULT_VIEWPORT_SIZE.lat / 2
  const lngSpread = DEFAULT_VIEWPORT_SIZE.lng / 2

  const bounds = {
    n: lat + latSpread,
    s: lat - latSpread,
    e: lng + lngSpread,
    w: lng - lngSpread
  }

  fetchEventsWithFilters({
    ...getSelectedFilters( getState() ),
    ...bounds,
    ...filters
  })( dispatch, getState )
}

export const mapInit = ({ boundsGetter }) => ({ type: MAP_INIT, boundsGetter })

// Events

export const EVENTS_REQUEST = 'EVENTS_REQUEST'
export const EVENTS_REPLACE = 'EVENTS_REPLACE'
export const EVENTS_ACTIVATE = 'EVENTS_ACTIVATE'
export const EVENTS_HIGHLIGHT = 'EVENTS_HIGHLIGHT'

export const fetchMapEvents = debounce(( dispatch, getState ) => {
  fetchEventsWithFilters({
    ...getMapBounds( getState() ),
    ...getSelectedFilters( getState() )
  })( dispatch )
}, 500 )

export const fetchEventsWithFilters = ( params ) => ( dispatch ) => {
  dispatch({ type: EVENTS_REQUEST })
  searchEvents( params )
    .then( events => dispatch({ type: EVENTS_REPLACE, events }) )
}

export const activateEvents = ({ eventIDs }) => ({ type: EVENTS_ACTIVATE, eventIDs })

export const deactivateAllEvents = () => activateEvents({ eventIDs: [] })

export const highlightEvents = ({ eventIDs }) => ({ type: EVENTS_HIGHLIGHT, eventIDs })

// Filters

export const filterChange = ({ ...filters }) => ( dispatch, getState ) => {
  replaceURL( filterToQs( filters ) )( dispatch, getState )
  fetchMapEvents( dispatch, getState )
}

// URL

export const startSearch = ({ location, filters }) => ( dispatch ) => {
  dispatch(push({
    pathname: '/map',
    query: {
      lat: location.lat,
      lng: location.lng,
      zoom: 9,
      ...filterToQs( filters )
    }
  }))
}

const replaceURL = ( query, path ) => ( dispatch, getState ) => {
  const location = getState().routing.locationBeforeTransitions

  dispatch(replace({
    pathname: path || location.pathname,
    query: {
      ...location.query,
      ...query
    }
  }))
}
