import $ from 'jquery'
import _ from 'lodash'
import Promise from 'promise'

let endpoints = {
  events: {
    search: '/events'
  }
}

let requests = {}

function promisify( jqXHR ) {
  return new Promise(( resolve, reject ) => {
    jqXHR.then( resolve, reject )
  })
}

function get( endpoint, params, reqID ) {
  return promisify( requests[reqID] = $.ajax({
    type: 'get',
    dataType: 'json',
    url: `http://localhost:3001${endpoint}`,
    data: params
  }) )
}

export const events = {
  search: _.partial( get, endpoints.events.search )
}

export const abortRequest = ( id ) => {
  requests[id].abort()
}


