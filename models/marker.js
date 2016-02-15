import _ from 'lodash'
import sha1 from 'sha1'

let Marker = {

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
  let precision = Math.floor( zoom / 4 )
  lat = parseFloat( lat ).toFixed( precision )
  lng = parseFloat( lng ).toFixed( precision )

  let marker = _.extend( {}, Marker, {
    lat,
    lng,
    zoom,
    id: sha1( '' + zoom + lat + lng ),
    events: []
  })

  _.bindAll( marker, _.functions( marker ) )

  return marker
}

export default factory
