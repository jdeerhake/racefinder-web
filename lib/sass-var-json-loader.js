var _ = require( 'lodash' );

function parseLineToVar( line ) {
  var varName = line.match( /\$(.*):/ )[1].split( '-' );
  var value = line.match( /:\s*(.*)\s*;/ )[1];

  var obj = {};
  varName.reduce(function( obj, name, i ) {
    obj[ name ] = ( i === varName.length - 1 ) ? value : {};
    return obj[ name ];
  }, obj );

  return obj;
}


module.exports = function( source ) {
  this.cacheable();

  var vars = source.split( '\n' ).reduce(function( styles, line ) {
    if( line.match(/^\s*\$/) ) {
      _.merge( styles, parseLineToVar( line ) );
    }
    return styles;
  }, {});

  return JSON.stringify( vars );
};
