import { replace } from 'react-router-redux'

export const MAP_CHANGE_VIEWPORT = 'MAP_CHANGE_VIEWPORT'

// Map

export const mapChangeViewport = viewport => dispatch => {
  dispatch(replace({
    pathname: '/map',
    query: {
      lat: viewport.latitude.toFixed( 3 ),
      lng: viewport.longitude.toFixed( 3 ),
      zoom: viewport.zoom.toFixed( 0 )
    }
  }))

  console.log(viewport.bounds)

  dispatch({ type: MAP_CHANGE_VIEWPORT, viewport })
}
