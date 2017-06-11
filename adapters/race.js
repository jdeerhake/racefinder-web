import { string, shape } from 'prop-types'

export const validate = shape({
  id: string,
  description: string,
  name: string
})

export const fromJSON = js => ({
  id: js.id,
  description: js.description,
  name: js.name
})
