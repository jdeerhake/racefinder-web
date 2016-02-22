import Dispatcher from '../dispatchers/racefinder-dispatcher.js'

let MapActions = {

  changeBounds( bounds ) {
    Dispatcher.dispatch({
      type: 'map_change_bounds',
      bounds: bounds
    })
  },

  changeCenter( center ) {
    Dispatcher.dispatch({
      type: 'map_change_center',
      center: center
    })
  },

  changeZoom( zoom ) {
    Dispatcher.dispatch({
      type: 'map_change_zoom',
      zoom: zoom
    })
  },

  click() {
    Dispatcher.dispatch({
      type: 'map_click'
    })
  },

  createMap( gMap ) {
    Dispatcher.dispatch({
      type: 'map_created',
      gMap: gMap
    })
  }
}

export default MapActions
