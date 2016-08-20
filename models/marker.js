import sha1 from 'sha1'
import bindAll from 'lodash/bindAll'
import functions from 'lodash/functions'

const Marker = {

  addEvent( eventID ) {
    if( this.events.indexOf( eventID ) === -1 ) {
      this.events.push( eventID )
    }
  },

  isEmpty() {
    return !!this.events.length
  }

}

function factory( lat, lng, zoom ) {
  const precision = Math.floor( zoom / 4 )
  lat = parseFloat( lat ).toFixed( precision )
  lng = parseFloat( lng ).toFixed( precision )

  const marker = {
    ...Marker,
    lat,
    lng,
    zoom,
    id: sha1( '' + zoom + lat + lng ),
    events: []
  }

  bindAll( marker, functions( marker ) )

  return marker
}

export default factory
