require( 'dotenv' ).config()

const resolve = require( 'path' ).resolve.bind( null, __dirname )
const webpack = require( 'webpack' )
const StatsPlugin = require( 'stats-webpack-plugin' )
const isProduction = process.env.NODE_ENV === 'production'

const envVarWhitelist = [
  'NODE_ENV',
  'MAPBOX_API_KEY',
  'MAPBOX_MAP_URL',
  'RACEFINDER_API'
]

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
      'mapbox-gl$': resolve( './node_modules/mapbox-gl/dist/mapbox-gl.js' )
    }
  },

  module: {
    rules: [

      // Babel (+JSX) transpile
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },

      // SASS compile and load
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [ resolve( './styles'), resolve( './node_modules/ress/' ) ]
            }
          }
        ]
      }

    ]
  },

  devtool: 'source-map',

  plugins: [

    new StatsPlugin( 'manifest.json', {
      chunkModules: false,
      source: true,
      chunks: false,
      modules: false,
      assets: true
    }),

    new webpack.EnvironmentPlugin( envVarWhitelist )

  ]
}

if( isProduction ) {

  config.plugins.push(

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        // TODO: mapbox-gl and uglify not playing nice, can be removed after upgrades
        comparisons: false
      }
    })

  )

}

module.exports = config
