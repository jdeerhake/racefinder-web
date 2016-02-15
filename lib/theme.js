import _ from 'lodash'
import { Styles as muiStyles } from 'material-ui'
import styles from './styles'

let ThemeManager = muiStyles.ThemeManager()

let palette = _.merge({}, ThemeManager.palette, {
  primary1Color: styles.color.stylized
})

ThemeManager.setPalette( palette )

export default ThemeManager.getCurrentTheme()
