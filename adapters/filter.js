import { string, shape, object } from 'prop-types'
import moment from 'moment'
import transform from 'lodash/transform'
import { URL_DATE } from '../lib/date-formats'

export const validate = shape({
  startDate: object,
  endDate: object,
  raceType: string,
  query: string
})

export const fromQueryString = qs => {
  const vals = {
    startDate: qs.start_date && moment( qs.start_date, URL_DATE ),
    endDate: qs.end_date && moment( qs.end_date, URL_DATE ),
    raceType: qs.race_type,
    query: qs.q
  }

  // removed undefined vals to avoid overriding defaults
  return transform(vals, (res, val, key) => {
    if(val !== undefined) { res[key] = val }
    return res
  })
}

export const toQueryString = filters => ({
  start_date: filters.startDate && filters.startDate.format( URL_DATE ),
  end_date: filters.endDate && filters.endDate.format( URL_DATE ),
  race_type: filters.raceType,
  q: filters.query
})

export const fromDefaults = () => ({
  startDate: moment(),
  endDate: moment().add( 1, 'year' ),
  raceType: '',
  query: ''
})
