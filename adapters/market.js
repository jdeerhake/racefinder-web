import { PropTypes } from 'react'
import { validate as validLocation, fromJSON as locationFromJSON } from './location'
import keyBy from 'lodash/keyBy'
import marketsJSON from '../lib/markets.json'

const { string, shape, number } = PropTypes

export const validate = shape({
  id: number.isRequired,
  location: validLocation.isRequired,
  name: string,
  slug: string.isRequired
})

export const fromJSON = js => ({
  id: js.id,
  location: locationFromJSON( js.location ),
  name: js.name,
  slug: js.slug
})

export const fromPathName = path => {
  // I have to do my own URL parsing because redux router is stupid and won't store params in state
  const [ base, marketSlug, filterPresetSlug ] = path.replace(/^\/|\/$/g, '').split( '/' )

  if( base === 'map' && marketSlug in bySlug ) {
    return bySlug[ marketSlug ]
  }
}

const allMarkets = marketsJSON.map( fromJSON )
const byId = keyBy( allMarkets, 'id' )
const bySlug = keyBy( allMarkets, 'slug' )

export const index = () => allMarkets

export const show = ( marketID ) => byId[ marketID ]

export const showBySlug = ( marketSlug ) => bySlug[ marketSlug ]
