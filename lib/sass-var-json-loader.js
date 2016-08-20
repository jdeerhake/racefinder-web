'use strict'

var merge = require( 'lodash/merge' )

function parseLineToVar( line ) {
  const varName = line.match( /\$(.*):/ )[1].split( '-' )
  const value = line.match( /:\s*(.*)\s*;/ )[1]

  const obj = {}
  varName.reduce(function( obj, name, i ) {
    obj[ name ] = ( i === varName.length - 1 ) ? value : {}
    return obj[ name ]
  }, obj )

  return obj
}


module.exports = function( source ) {
  this.cacheable()

  var vars = source.split( '\n' ).reduce(function( styles, line ) {
    if( line.match(/^\s*\$/) ) {
      merge( styles, parseLineToVar( line ) )
    }
    return styles
  }, {})

  return JSON.stringify( vars )
}
