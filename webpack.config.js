const resolve = require( 'path' ).resolve.bind( null, __dirname )
const webpack = require( 'webpack' )
const StatsPlugin = require( 'stats-webpack-plugin' )
const isProduction = process.env.NODE_ENV === 'production'

const config = {

  entry: './app.js',

  output: {
    path: resolve( './public/generated' ),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.json$/,       loader: 'json' },
      { test: /\.jsx?$/,       loader: 'babel', exclude: /node_modules/ },
      { test: /\.scss$/,       loader: 'style!css!sass' +
        '?includePaths[]=' + resolve( './styles' ) +
        '&includePaths[]=' + resolve( './node_modules/compass-mixins/lib' )
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
    })
  ]
}

if( isProduction ) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  )
}

module.exports = config