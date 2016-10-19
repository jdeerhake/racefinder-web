require( 'dotenv' ).config()

const resolve = require( 'path' ).resolve.bind( null, __dirname )
const webpack = require( 'webpack' )
const _ = require( 'lodash' )
const StatsPlugin = require( 'stats-webpack-plugin' )
const isProduction = process.env.NODE_ENV === 'production'

const env = _.pick( process.env, [
  'NODE_ENV',
  'MAPBOX_API_KEY',
  'MAPBOX_MAP_URL'
])

const config = {

  entry: {
    app: resolve( './app.jsx' )
  },

  output: {
    path: resolve( './public/generated' ),
    filename: '[name].js'
  },

  resolve: {
    alias: {
      'webworkify': 'webworkify-webpack',
      'config': ''
    }
  },

  module: {
    loaders: [
      { test: /\.json$/,       loader: 'json' },
      { test: /\.jsx?$/,       loader: 'babel', exclude: /node_modules/ },
      {
        test: /\.scss$/,       loader: 'style!css!sass' +
          '?includePaths[]=' + resolve( './styles' ) +
          '&includePaths[]=' + resolve( './node_modules/compass-mixins/lib' )
      },
      {
        test: /\.js$/,
        loader: 'transform/cacheable?brfs',
        include: resolve( 'node_modules/mapbox-gl-shaders/index.js' ),
      }
    ],

    postLoaders: [
      {
        query: 'brfs',
        loader: 'transform',
        include: /node_modules\/mapbox-gl-shaders/
      }
    ]
  },

  plugins: [
    new StatsPlugin( 'manifest.json', {
      chunkModules: false,
      source: false,
      chunks: false,
      modules: false,
      assets: true
    }),

    new webpack.DefinePlugin({
      'process.env': JSON.stringify( env )
    })
  ]
}

if( isProduction ) {

  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
      sourceMap: false
    }),

    new webpack.optimize.DedupePlugin(),

    new webpack.optimize.OccurenceOrderPlugin()
  )

}

module.exports = config
