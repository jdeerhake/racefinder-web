import {  string, number, object, shape } from 'prop-types'
import keyBy from 'lodash/keyBy'
import filterPresetJSON from '../lib/filter-presets.json'

export const validate = shape({
  id: number.isRequired,
  name: string.isRequired,
  slug: string.isRequired,
  filters: object.isRequired
})

export const fromJSON = js => ({
  id: js.id,
  name: js.name,
  slug: js.slug,
  filters: js.filters
})

export const fromPathName = path => {
  // I have to do my own URL parsing because redux router is stupid and won't store params in state
  const [ base, marketSlug, filterPresetSlug ] = path.replace(/^\/|\/$/g, '').split( '/' )

  if( base === 'map' && filterPresetSlug in bySlug ) {
    return bySlug[ filterPresetSlug ]
  }
}

export const index = () => allPresets

export const show = ( presetID ) => byId[ presetID ]

export const showBySlug = ( presetSlug ) => bySlug[ presetSlug ]

const allPresets = filterPresetJSON.map( fromJSON )
const byId = keyBy( allPresets, 'id' )
const bySlug = keyBy( allPresets, 'slug' )
