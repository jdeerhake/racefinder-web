var resolve = require( 'path' ).resolve.bind( null, __dirname )

module.exports = {

  entry: './app.js',

  output: {
    path: resolve( './public/generated' ),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/generated/'
  },

  module: {
    loaders: [
      { test: /\.json$/,       loader: 'json' },
      { test: /\.jsx?$/,         loader: 'babel', exclude: /node_modules/ },
      { test: /\.scss$/,       loader: 'style!css!sass' +
        '?includePaths[]=' + resolve( './styles' ) +
        '&includePaths[]=' + resolve( './node_modules/compass-mixins/lib' )
      }
    ]
  }

}