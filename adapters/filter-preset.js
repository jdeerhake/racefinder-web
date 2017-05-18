import { PropTypes } from 'react'
import keyBy from 'lodash/keyBy'
import filterPresetJSON from '../lib/filter-presets.json'

const { string, number, object, shape } = PropTypes

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

export const index = () => allPresets

export const show = ( presetID ) => byId[ presetID ]

export const showBySlug = ( presetSlug ) => bySlug[ presetSlug ]

const allPresets = filterPresetJSON.map( fromJSON )
const byId = keyBy( allPresets, 'id' )
const bySlug = keyBy( allPresets, 'slug' )
