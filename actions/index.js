import debounce from 'lodash/debounce'
import { replace } from 'react-router-redux'
import { index as searchEvents } from '../adapters/event'

export const MAP_CHANGE_VIEWPORT = 'MAP_CHANGE_VIEWPORT'
export const EVENTS_REPLACE = 'EVENTS_REPLACE'

// Map

export const mapChangeViewport = viewport => ( dispatch, getState ) => {
  dispatch(replace({
    pathname: '/map',
    query: {
      lat: viewport.latitude.toFixed( 3 ),
      lng: viewport.longitude.toFixed( 3 ),
      zoom: viewport.zoom.toFixed( 0 )
    }
  }))

  fetchEvents( dispatch, getState )

  dispatch({ type: MAP_CHANGE_VIEWPORT, viewport })
}


// Events

export const fetchEvents = debounce(( dispatch, getState ) => {
  const { n, s, e, w } = getState().map.viewport.toJS().bounds
  searchEvents({
    type: 'run',
    n, s, e, w
  }).then( events => {
    dispatch({ type: EVENTS_REPLACE, events })
  })
}, 500)
