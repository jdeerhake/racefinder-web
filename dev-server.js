require( 'dotenv' ).config()

var http = require( 'http' )
var nodeStatic = require( 'node-static' )
var fileServer = new nodeStatic.Server( './public' )
var PORT = process.env.DEV_SERVER_PORT

http.createServer(function( request, response ) {

  request.addListener( 'end', function () {
    fileServer.serve( request, response, function( e ) {
      console.log( `SERVER: request received for ${request.url}` )
      if( e && ( e.status === 404 ) ) {
        fileServer.serveFile( 'index.html', 200, {}, request, response)
      }
    })
  }).resume()

}).listen( PORT )

console.log( `SERVER: ready and listening on port ${PORT}` )
