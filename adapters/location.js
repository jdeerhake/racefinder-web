import { number, string, shape } from 'prop-types'

export const validate = shape({
  lat: number.isRequired,
  lng: number.isRequired,
  city: string,
  state: string
})

export const fromJSON = js => ({
  lat: parseFloat( js.lat ),
  lng: parseFloat( js.lng ),
  city: js.city,
  state: js.state
})
