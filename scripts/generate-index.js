require( 'dotenv' ).config()
console.log( '\nGenerating new index.html' )
const fs = require( 'fs' )
const resolve = require( 'path' ).resolve.bind( null, __dirname )
const Handlebars = require( 'handlebars' )

const templateFile = resolve( '../index.html.hbs' )
const outputFile = resolve( '../public/index.html' )

const tmpl = Handlebars.compile( fs.readFileSync( templateFile ).toString() )
const data = require( resolve( '../lib/template-data' ) )

fs.writeFileSync( outputFile, tmpl( data ) )
console.log( 'Done.\n\n' )
