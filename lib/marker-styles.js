import styles from './styles'
const MarkerStyles = {}

MarkerStyles.paths = {
  ROUND_PIN: 'M0-165c-27.618 0-50 21.966-50 49.054C-50-88.849 0 0 0 0s50-88.849 50-115.946C50-143.034 27.605-165 0-165z',
  SQUARE_PIN: 'M 50 -119.876 -50 -119.876 -50 -19.876 -13.232 -19.876 0.199 0 13.63 -19.876 50 -19.876 Z'
}

const icon = {
  path: MarkerStyles.paths.ROUND_PIN,
  scale: 0.2,
  fillOpacity: 1,
  strokeColor: '#FFF',
  strokeWeight: 1
}

MarkerStyles.ACTIVE_ICON = {
  ...icon,
  fillColor: styles.color.active
}

MarkerStyles.HIGHLIGHTED_ICON = {
  ...icon,
  fillColor: styles.color.link
}

MarkerStyles.INACTIVE_ICON = {
  ...icon,
  fillColor: styles.color.accent
}

export default MarkerStyles
