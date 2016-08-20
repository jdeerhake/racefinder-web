import bindAll from 'lodash/bindAll'
import isEmpty from 'lodash/isEmpty'
import functions from 'lodash/functions'
import { EventEmitter } from 'events'

const Store = {

  ...EventEmitter.prototype,

  get( id ) {
    return this._items[ id ]
  },

  getAll() {
    return this._items
  },

  getIDs() {
    return Object.keys( this._items )
  },

  addChangeListener( cb ) {
    this.on( 'change', cb )
  },

  removeChangeListener( cb ) {
    this.removeListener( 'change', cb )
  },

  // setters
  add( id, val ) {
    if( typeof this.get( id ) === 'undefined' ) {
      this._items[ id ] = val
      return true
    }
  },

  addOrSet( id, val ) {
    if( this.get( id ) !== val ) {
      this._items[ id ] = val
      return true
    }
  },

  remove( id ) {
    if( typeof this._items[ id ] !== 'undefined' ) {
      delete this._items[ id ]
      return true
    }
  },

  replace( items ) {
    if( items !== this._items ) {
      this._items = { ...items }
      return true
    }
  },

  extend( items ) {
    this._items = {
      ...this._items,
      items
    }
    return true
  },

  reset() {
    return !isEmpty( this._items ) && ( this._items = {}, true )
  },

  emitChange() {
    this.emit( 'change' )
  },

  _listen( dispatcher ) {
    this.token = dispatcher.register( this._primaryHandler.bind( this ) )
  },

  _primaryHandler( payload ) {
    const handler = this._handlers[ payload.type ]
    if( handler && handler( payload ) ) {
      this.emitChange()
    }
  },

  handle( events, func ) {
    const handle = func.bind( this )
    Array().concat( events ).forEach( event => { this._handlers[ event ] = handle })
  }

}

function makeStore( dispatcher, mixin ) {
  const store = {
    ...Store,
    _items: {},
    _handlers: {},
    ...mixin
  }

  bindAll( store, functions( store ) )

  store._listen( dispatcher )

  return store
}

export default makeStore
