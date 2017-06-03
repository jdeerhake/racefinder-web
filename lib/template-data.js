const assetManifest = require( '../public/generated/manifest.json' )

module.exports = {
  isProduction: process.env.NODE_ENV === 'production',
  cdnUrl: process.env.CDN_URL,
  jsHash: assetManifest.hash
}
