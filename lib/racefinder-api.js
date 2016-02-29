import $ from 'jquery'
import _ from 'lodash'
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
  search: _.partial( get, endpoints.events.search )
}

export const abortRequest = ( id ) => {
  requests[id].abort()
}


