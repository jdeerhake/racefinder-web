import { PropTypes } from 'react'
import flatten from 'lodash/flatten'
import round from 'lodash/round'
import sha1 from 'sha1'

const { string, number, arrayOf, shape } = PropTypes

export const validate = shape({
  id: string.isRequired,
  eventIDs: arrayOf( string ),
  lat: number.isRequired,
  lng: number.isRequired
})


export const fromEventAndZoom = ({ id: eventID, location }, zoom ) => {
  const precision = Math.floor( zoom / 4 )
  const lat = round( location.lat, precision )
  const lng = round( location.lng, precision )

  return {
    id: sha1( `${lat}${lng}${zoom}` ),
    eventIDs: [ eventID ],
    lat, lng
  }
}

export const merge = ( ...markers ) => ({
  eventIDs: flatten( markers.map( m => m.eventIDs ) ),
  ...markers[0]
})
