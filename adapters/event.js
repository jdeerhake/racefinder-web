import moment from 'moment'
import { string, shape, arrayOf, object } from 'prop-types'
import { events as api } from '../lib/racefinder-api'
import { validate as validLocation, fromJSON as locationFromJSON } from './location'
import { validate as validRace, fromJSON as raceFromJSON } from './race'
import { ALL_RACE_TYPES } from './filter-options'
import { EVENT_DATE, EVENT_DATE_TIME, EVENT_DATE_TIME_MINS, URL_DATE } from '../lib/date-formats'


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
  startDate: moment.unix( js.startDate ).utc(),
  formattedStartTime: formattedStartTime( js )
})

export const index = ({
  startDate,
  endDate,
  raceType,
  query,
  n, s, e, w
}, id ) => api.search({
  start_date: startDate && startDate.format( URL_DATE ),
  end_date: endDate && endDate.format( URL_DATE ),
  'types[]': raceType || ALL_RACE_TYPES,
  query,
  n, s, e, w
}, id ).then( resp => resp.events.map( fromJSON ) )


function formattedStartTime( js ) {
  const startDate = moment.unix( js.startDate ).utc()
  if( startDate.hour() === 0 ) {
    return startDate.format( EVENT_DATE )
  } else if( startDate.minute() === 0 ) {
    return startDate.format( EVENT_DATE_TIME )
  } else {
    return startDate.format( EVENT_DATE_TIME_MINS )
  }
}
