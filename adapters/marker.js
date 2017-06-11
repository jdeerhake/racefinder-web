import { string, number, arrayOf, shape } from 'prop-types'
import flatten from 'lodash/flatten'
import round from 'lodash/round'
import md5 from 'md5'


export const validate = shape({
  id: string.isRequired,
  eventIDs: arrayOf( string ),
  lat: number.isRequired,
  lng: number.isRequired
})

export const fromEventAndZoom = ( event, zoom ) => {
  const precision = Math.floor( zoom / 4 )
  const lat = round( event.location.lat, precision )
  const lng = round( event.location.lng, precision )

  return {
    id: md5( `${lat}${lng}${zoom}` ),
    eventIDs: [ event.id ],
    active: event.active,
    highlighted: event.highlighted,
    lat,
    lng
  }
}

export const merge = ( ...markers ) => ({
  ...markers[0],
  eventIDs: flatten( markers.map( m => m.eventIDs ) ),
  highlighted: markers.some( m => m.highlighted ),
  active: markers.some( m => m.active )
})
