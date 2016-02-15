import _ from 'lodash'

function makeStatusStore( name ) {
  let ucName = name.charAt( 0 ).toUpperCase() + name.slice( 1 )
  let ids = []

  let fns = {

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
        _.pull( ids, id )
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
      if( _.xor( ids, newIds ).length ) {
        ids = [].concat( newIds )
        return true
      }
    }

  }

  return _.mapKeys( fns, ( value, key ) => key + ucName )
}

export default makeStatusStore
