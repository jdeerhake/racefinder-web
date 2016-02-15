var conf = require( './webpack.config' );
var gulp = require( 'gulp' );
var gutil = require( 'gulp-util' );
var livereload = require( 'livereload' );

var webpack = require( 'webpack' );

gulp.task( 'compile', function( cb ) {

  webpack( conf, function( err, stats ) {
    if( err ) { throw new gutil.PluginError("webpack", err); }
    gutil.log( 'webpack:', stats.toString({}) );
    cb();
  });

});

gulp.task( 'watch', function() {

  var lrServer = livereload.createServer();
  lrServer.watch( __dirname + '/public' );

  var compiler = webpack( conf );

  compiler.watch( {}, function( err, stats ) {
    var totalTime = stats.endTime - stats.startTime;
    gutil.log( 'webpack: finished after ' + totalTime + 'ms' );
  });

});

gulp.task( 'default', [ 'watch' ]);
