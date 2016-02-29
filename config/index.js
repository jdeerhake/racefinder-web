const env = process.env.NODE_ENV || 'development'
const merge = require( 'lodash/merge' )

const config = merge( {}, require( './defaults' ) )

try {
  merge( config, require( './env.' + env ) )
} catch(e) {}

module.exports = config