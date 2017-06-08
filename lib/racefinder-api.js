import { format } from 'url'

const RACEFINDER_API = process.env.RACEFINDER_API
const isProd = process.env.NODE_ENV === 'production'
const requests = {}


const endpoints = {
  events: {
    search: '/events'
  },
  places: {
    search: '/places'
  }
}

const get = ( pathname, query, reqID ) => {
  const url = format({
    protocol: isProd ? 'https' : 'http',
    host: RACEFINDER_API,
    pathname, query
  })
  const req = requests[reqID] = fetch( url, { method: 'GET', mode: 'cors' })
  req.then( () => delete requests[reqID] )
  return req.then( resp => resp.json() )
}

export const events = {
  search: ( params, reqID ) => get( endpoints.events.search, { v: 2, ...params }, reqID )
}

export const places = {
  search: ( params, reqID ) => get( endpoints.places.search, params, reqID )
}

export const abortRequest = ( id ) => {
  requests[id].abort()
}
