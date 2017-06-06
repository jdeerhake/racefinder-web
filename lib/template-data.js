const Handlebars = require( 'handlebars' )
const url = require( 'url' )
const assetManifest = require( '../public/generated/manifest.json' )

Handlebars.registerHelper( 'cdnURLWithHash', ( path ) => {
  const out = url.parse( process.env.CDN_URL || '' )
  out.pathname = path
  out.query = { v: assetManifest.hash }
  return new Handlebars.SafeString( url.format( out ) )
})

module.exports = {
  isProduction: process.env.NODE_ENV === 'production',
  cdnBase: process.env.CDN_URL
}
