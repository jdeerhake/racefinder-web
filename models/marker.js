import sha1 from 'sha1'

class Marker {

  __constructor({ lat, lng, zoom }) {
    const precision = Math.floor( zoom / 4 )
    this.lat = parseFloat( lat ).toFixed( precision )
    this.lng = parseFloat( lng ).toFixed( precision )
    this.zoom = zoom
    this.events = []
    this.id = sha1( `${this.lat}-${this.lng}-${this.zoom}` )
  }

  addEvent( eventID ) {
    if( !this.hasEvent( eventID ) ) {
      this.events.push( eventID )
    }
  }

  hasEvent( eventID ) {
    return this.events.indexOf( eventID ) > -1
  }

  isEmpty() {
    return !!this.events.length
  }

}


export default Marker
