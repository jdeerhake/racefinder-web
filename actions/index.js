import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'
import throttle from 'lodash/throttle'
import { replace } from 'react-router-redux'
import { index as searchEvents } from '../adapters/event'
import { getMapBounds } from '../selectors/index'
export const MAP_CHANGE_VIEWPORT = 'MAP_CHANGE_VIEWPORT'
export const EVENTS_REPLACE = 'EVENTS_REPLACE'

// Map

const areBoundsChanged = throttle(( getState, bounds ) => (
  !isEqual( getMapBounds( getState() ), bounds )
), 50 )

export const mapChangeViewport = viewport => ( dispatch, getState ) => {
  if( areBoundsChanged( getState, viewport.bounds ) ) {
    mapChangeBounds( viewport, dispatch, getState )
  }

  dispatch({ type: MAP_CHANGE_VIEWPORT, viewport })
}

const mapChangeBounds = ( viewport, dispatch, getState ) => {
  dispatch(replace({
    pathname: '/map',
    query: {
      lat: viewport.latitude.toFixed( 3 ),
      lng: viewport.longitude.toFixed( 3 ),
      zoom: viewport.zoom.toFixed( 0 )
    }
  }))

  fetchEvents( dispatch, getState )
}


// Events

export const fetchEvents = debounce(( dispatch, getState ) => {
  const { n, s, e, w } = getMapBounds( getState() )

  searchEvents({
    type: 'run',
    n, s, e, w
  }).then( events => {
    dispatch({ type: EVENTS_REPLACE, events })
  })
}, 100)


// Filters

export const filterChange = ( filterChanges ) => {

}
