import debounce from 'lodash/debounce'
import { replace } from 'react-router-redux'
import { index as searchEvents } from '../adapters/event'
import { getMapBounds } from '../selectors/index'
import { toQueryString as filterToQs } from '../adapters/filter'
export const MAP_CHANGE_VIEWPORT = 'MAP_CHANGE_VIEWPORT'
export const MAP_INIT = 'MAP_INIT'
export const EVENTS_REPLACE = 'EVENTS_REPLACE'

// Map

export const mapChangeViewport = viewport => ( dispatch, getState ) => {
  dispatch({ type: MAP_CHANGE_VIEWPORT, viewport })

  updateMapParams( dispatch, getState )
  fetchEvents( dispatch, getState )
}

const updateMapParams = debounce(( dispatch, getState ) => {
  const viewport = getState().map.viewport
  const location = getState().routing.locationBeforeTransitions

  dispatch(replace({
    pathname: '/map',
    query: {
      ...location.query,
      lat: viewport.latitude.toFixed( 3 ),
      lng: viewport.longitude.toFixed( 3 ),
      zoom: viewport.zoom.toFixed( 0 )
    }
  }))
}, 500 )

export const mapInit = ({ boundsGetter }) => ({ type: MAP_INIT, boundsGetter })

// Events

export const fetchEvents = debounce(( dispatch, getState ) => {
  searchEvents({
    ...getMapBounds( getState() ),
    ...getState().filter.selected
  }).then( events => {
    dispatch({ type: EVENTS_REPLACE, events })
  })
}, 500 )


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
