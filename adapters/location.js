import { PropTypes } from 'react'

const { number, string, shape } = PropTypes

export const validate = shape({
  lat: number,
  lng: number,
  city: string,
  state: string
})

export const fromJSON = js => ({
  lat: parseFloat( js.lat ),
  lng: parseFloat( js.lng ),
  city: js.city,
  state: js.state
})
