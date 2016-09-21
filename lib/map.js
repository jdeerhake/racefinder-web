import mapObject from 'lodash/mapObject'
const { maps } = window.google
const { addListener } = maps.event

export const mapTypes = {
  ROAD: maps.MapTypeId.ROADMAP
}

const defaults = {
  mapTypeId: mapTypes.ROAD,
  disableDefaultUI: true,
  zoomControl: true,
  zoomControlOptions: {
    position: maps.ControlPosition.TOP_LEFT
  }
}

const events = {
  move: 'bounds_changed',
  zoom: 'zoom_changed',
  click: 'click',
  tilesLoaded: 'tilesloaded'
}

const createPoint = ({ lat, lng }) => new maps.LatLng( lat, lng )

export default class Map {

  __constructor( el, { center, zoom }) {
    this._gmap = new maps.Map( el, {
      ...defaults,
      center: createPoint( center ),
      zoom
    })

    mapObject( events, ( event, gmapEvent ) => {
      addListener( this._gmap, gmapEvent, () => this.emit( event ) )
    })
  }

  getBounds() {
    const bounds = this._gmap.getBounds()
    const ne = bounds.getNorthEast()
    const sw = bounds.getSouthWest()

    return {
      n: ne.lat(),
      s: sw.lat(),
      e: ne.lng(),
      w: sw.lng()
    }
  }

  getCenter() {
    const pt = this._gmap.getCenter()
    return {
      lat: pt.lat(),
      lng: pt.lng()
    }
  }

  getZoom() {
    return this._gmap.getZoom()
  }

  move( latLng ) {
    this._gmap.panTo( createPoint( latLng ) )
  }

  zoom( zoom ) {
    this._gmap.setZoom( zoom )
  }
}
