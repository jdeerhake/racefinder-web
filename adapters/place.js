import { string, shape, number } from 'prop-types'
import { places as api } from '../lib/racefinder-api'
import { validate as validLocation, fromJSON as locationFromJSON } from './location'


export const validate = shape({
  id: string.isRequired,
  type: string,
  name: string,
  stateAbbr: string,
  state: string,
  postalCode: string,
  population: number,
  elevation: number,
  timezone: string,
  location: validLocation.isRequired
})

export const fromJSON = js => ({
  id: js.id,
  type: js.type,
  name: js.name,
  stateAbbr: js.stateAbbr,
  population: js.population,
  elevation: js.elevation,
  timezone: js.timezone,
  state: js.state,
  postalCode: js.postalCode,
  location: locationFromJSON( js.location )
})

export const fromLatLng = ( lat, lng ) => ({
  id: 'loc${ lat }${ lng }',
  name: `${ lat.toFixed( 3 ) }, ${ lng.toFixed( 3 ) }`,
  location: locationFromJSON({ lat, lng })
})

export const index = ( query, id ) => (
  api.search({ query }, id ).then( resp => resp.places.map( fromJSON ) )
)
