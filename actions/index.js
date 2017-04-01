import debounce from 'lodash/debounce'
import { replace } from 'react-router-redux'
import { index as searchEvents } from '../adapters/event'
import { getMapBounds } from '../selectors/index'
import { toQueryString as filterToQs } from '../adapters/filter'

// Map

export const MAP_MOVE = 'MAP_MOVE'
export const MAP_INIT = 'MAP_INIT'
export const MAP_INITIAL_STATE = 'MAP_INITIAL_STATE'

export const mapMove = viewport => ( dispatch, getState ) => {
  const location = getState().routing.locationBeforeTransitions

  dispatch({ type: MAP_MOVE, viewport })

  dispatch(replace({
    pathname: '/map',
    query: {
      ...location.query,
      lat: viewport.latitude.toFixed( 3 ),
      lng: viewport.longitude.toFixed( 3 ),
      zoom: viewport.zoom.toFixed( 0 )
    }
  }))

  fetchEvents( dispatch, getState )
}

export const mapInitialState = ( viewport ) => ( dispatch, getState ) => {
  dispatch({ type: MAP_INITIAL_STATE, viewport })
  mapMove( viewport )( dispatch, getState )
}

export const mapInit = ({ boundsGetter }) => ({ type: MAP_INIT, boundsGetter })

// Events

export const EVENTS_REQUEST = 'EVENTS_REQUEST'
export const EVENTS_REPLACE = 'EVENTS_REPLACE'
export const EVENTS_ACTIVATE = 'EVENTS_ACTIVATE'
export const EVENTS_HIGHLIGHT = 'EVENTS_HIGHLIGHT'

export const fetchEvents = debounce(( dispatch, getState ) => {
  dispatch({ type: EVENTS_REQUEST })
  searchEvents({
    ...getMapBounds( getState() ),
    ...getState().filter.selected
  }).then( events => {
    dispatch({ type: EVENTS_REPLACE, events })
  })
}, 500 )

export const activateEvents = ({ eventIDs }) => ({ type: EVENTS_ACTIVATE, eventIDs })

export const deactiveAllEvents = () => activateEvents({ eventIDs: [] })

export const highlightEvents = ({ eventIDs }) => ({ type: EVENTS_HIGHLIGHT, eventIDs })

// Filters

export const filterChange = ({ ...filters }) => ( dispatch, getState ) => {
  const location = getState().routing.locationBeforeTransitions

  fetchEvents( dispatch, getState )

  dispatch(replace({
    pathname: location.pathname,
    query: {
      ...location.query,
      ...filterToQs( filters )
    }
  }))
}
