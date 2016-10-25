import colors from './colors'

export const paths = {
  ROUND_PIN: 'M0-165c-27.618 0-50 21.966-50 49.054C-50-88.849 0 0 0 0s50-88.849 50-115.946C50-143.034 27.605-165 0-165z',
  SQUARE_PIN: 'M 50 -119.876 -50 -119.876 -50 -19.876 -13.232 -19.876 0.199 0 13.63 -19.876 50 -19.876 Z'
}

const icon = {
  stroke: '#FFF',
  strokeWidth: '4px',
  cursor: 'pointer',
  pointerEvents: 'all'
}

export const ACTIVE_ICON = {
  ...icon,
  fill: colors[ 'color-active' ]
}

export const HIGHLIGHTED_ICON = {
  ...icon,
  fill: colors[ 'color-link' ]
}

export const INACTIVE_ICON = {
  ...icon,
  fill: colors[ 'color-accent' ]
}
