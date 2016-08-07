import _ from 'lodash'
import { events as api } from '../lib/racefinder-api'

let Event = {

  sortWith( event ) {
    const lat = Math.round( (this.location.lat - event.location.lat) * 1000 )
    const lng = Math.round( (this.location.lng - event.location.lng) * 1000 )
    const date = this.startDate - event.startDate

    return lat || lng || date
  }

}

function factory( data ) {
  let event = _.extend( {}, Event, data )
  _.bindAll( event, _.functions( event ) )

  event.location.lat = parseFloat( event.location.lat )
  event.location.lng = parseFloat( event.location.lng )

  return event
}

factory.search = function( params, reqID ) {
  return api.search( formatRequestParams( params ), reqID )
    .then( _.partialRight( _.map, factory ) )
}

let DATE_FORMAT = 'YYYY-MM-DD'
function formatRequestParams( params ) {
  return {
    'start_date': params.dateRange && params.dateRange[0].format( DATE_FORMAT ),
    'end_date': params.dateRange && params.dateRange[1].format( DATE_FORMAT ),
    'types': [].concat( params.type || [] ),
    'query': params.query,
    'n': params.n,
    's': params.s,
    'e': params.e,
    'w': params.w
  }
}

export default factory
