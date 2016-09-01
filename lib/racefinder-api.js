import { format } from 'url'

const { RACEFINDER_API } = process.env
const requests = {}


const endpoints = {
  events: {
    search: '/events'
  }
}


const get = ( pathname, query, reqID ) => {
  const url = format({
    protocol: 'http',
    host: RACEFINDER_API,
    pathname, query
  })
  const req = requests[reqID] = fetch( url, { method: 'GET', mode: 'cors' })
  req.then( () => delete requests[reqID] )
  return req.then( resp => resp.json() )
}

export const events = {
  search: ( params, reqID ) => get( endpoints.events.search, params, reqID )
}

export const abortRequest = ( id ) => {
  requests[id].abort()
}


