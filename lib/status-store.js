import mapKeys from 'lodash/mapKeys'
import xor from 'lodash/xor'
import pull from 'lodash/pull'

function makeStatusStore( name ) {
  const ucName = name.charAt( 0 ).toUpperCase() + name.slice( 1 )
  let ids = []

  const fns = {

    get() {
      return ids
    },

    is( id ) {
      return ids.indexOf( id ) > -1
    },

    has() {
      return !!ids.length
    },

    add( id ) {
      if( !fns.is( id ) ) {
        ids.push( id )
        return true
      }
    },

    remove( id ) {
      if( fns.is( id ) ) {
        pull( ids, id )
        return true
      }
    },

    reset() {
      if( fns.has() ) {
        ids = []
        return true
      }
    },

    replace( newIds ) {
      newIds = [].concat( newIds )
      if( xor( ids, newIds ).length ) {
        ids = [].concat( newIds )
        return true
      }
    }

  }

  return mapKeys( fns, ( value, key ) => key + ucName )
}

export default makeStatusStore
