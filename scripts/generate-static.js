require( 'dotenv' ).config()
const fs = require( 'fs' )
const Handlebars = require( 'handlebars' )
const resolve = require( 'path' ).resolve.bind( null, __dirname )
const data = require( resolve( '../lib/template-data' ) )


function makeIndex() {
  const templateFile = resolve( '../index.html.hbs' )
  const outputFile = resolve( '../public/index.html' )
  const tmpl = Handlebars.compile( fs.readFileSync( templateFile ).toString() )
  fs.writeFileSync( outputFile, tmpl( data ) )
}


function makeSitemap() {
  const templateFile = resolve( '../sitemap.xml.hbs' )
  const outputFile = resolve( '../public/sitemap.xml' )
  const tmpl = Handlebars.compile( fs.readFileSync( templateFile ).toString() )
  fs.writeFileSync( outputFile, tmpl( data ) )
}

console.log( '\nGenerating new index.html' )
makeIndex()
console.log( 'Done.' )

console.log( '\nGenerating new sitemap.xml' )
makeSitemap()
console.log( 'Done.' )

console.log( '\n\n' )
