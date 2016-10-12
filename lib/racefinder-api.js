import { format } from 'url'
import config from '../config'


const endpoints = {
  events: {
    search: '/events'
  }
}

const config = {
  method: 'GET',
  mode: 'cors'
}

const requests = {}

const get = ( pathname, query, reqID ) => {
  const req = requests[reqID] = fetch( format({ pathname, query }), config )
  req.then( () => delete requests[reqID] )
  return req
}

export const events = {
  search: ( params, reqID ) => get( endpoints.events.search, params, reqID )
}

export const abortRequest = ( id ) => {
  requests[id].abort()
}


