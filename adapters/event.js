import moment from 'moment'
import { PropTypes } from 'react'
import { events as api } from '../lib/racefinder-api'
import { validate as validLocation, fromJSON as locationFromJSON } from './location'
import { validate as validRace, fromJSON as raceFromJSON } from './race'

const { string, shape, arrayOf, object } = PropTypes
const DATE_FORMAT = 'YYYY-MM-DD'

export const validate = shape({
  id: string.isRequired,
  infoURL: string,
  location: validLocation.isRequired,
  logoImage: string,
  name: string.isRequired,
  races: arrayOf( validRace ),
  registrationURL: string,
  startDate: object
})

export const fromJSON = js => ({
  id: js.id,
  infoURL: js.infoURL,
  location: locationFromJSON( js.location ),
  logoImage: js.logoImage,
  name: js.name,
  races: ( js.races || [] ).map( raceFromJSON ),
  registrationURL: js.registrationURL,
  startDate: moment.unix( js.startDate ).utc()
})

export const index = ({
  startDate = moment(),
  endDate = moment().add( 3, 'months' ),
  type,
  query,
  n, s, e, w
}, id ) => api.search({
  start_date: startDate && startDate.format( DATE_FORMAT ),
  end_date: endDate && endDate.format( DATE_FORMAT ),
  types: [ type ],
  query,
  n, s, e, w
}, id ).then( ev => ev.map( fromJSON ) )
