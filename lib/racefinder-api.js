import $ from 'jquery'
import Promise from 'promise'
import config from '../config'


const endpoints = {
  events: {
    search: '/events'
  }
}

const requests = {}

function promisify( jqXHR ) {
  return new Promise(( resolve, reject ) => {
    jqXHR.then( resolve, reject )
  })
}

function get( endpoint, params, reqID ) {
  return promisify( requests[reqID] = $.ajax({
    type: 'get',
    dataType: 'json',
    url: `${config.apiServer}${endpoint}`,
    data: params
  }) )
}

export const events = {
  search: ( params, reqID ) => get( endpoints.events.search, params, reqID )
}

export const abortRequest = ( id ) => {
  requests[id].abort()
}


