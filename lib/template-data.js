const Handlebars = require( 'handlebars' )
const url = require( 'url' )
const path = require( 'path' )
const flatten = require( 'lodash/flatten' )
const assetManifest = require( '../public/generated/manifest.json' )

const assetPathForChunk = ( chunk, ext ) => {
  var extension = new RegExp( ext + '$' )
  return assetManifest.assetsByChunkName[ chunk ].filter( fname => fname.match( extension ) )[0]
}

Handlebars.registerHelper( 'cdnURLWithHash', ( chunk, { hash: { ext } }) => {
  const out = url.parse( process.env.CDN_URL || '' )
  out.pathname = path.resolve( '/generated', assetPathForChunk( chunk, ext ) )
  return new Handlebars.SafeString( url.format( out ) )
})


const filterPresets =  require( '../lib/filter-presets' )
const marketURLs = require( '../lib/markets' ).map( market => (
  filterPresets.map( fp => `map/${ market.slug }/${ fp.slug }` )
))

module.exports = {
  isProduction: process.env.NODE_ENV === 'production',
  cdnBase: process.env.CDN_URL,
  urlBase: process.env.BASE_URL,
  sitemapPaths: flatten( marketURLs )
}
