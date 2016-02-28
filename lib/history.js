const url = require( 'url' )
const qs = require( 'querystring' )
const _ = require( 'lodash' )

export const params = () => {
  const uri = url.parse( window.location.href, true )
  return uri.query || {}
}

export const overrideParams = ( override ) => {
  const newParams = _.merge( params(), override )
  window.history.replaceState({}, '', `?${qs.stringify( newParams )}` )
}