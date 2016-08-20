import styles from './styles'

import Colors from 'material-ui/lib/styles/colors'
import ColorManipulator from 'material-ui/lib/utils/color-manipulator'
import Spacing from 'material-ui/lib/styles/spacing'
import zIndex from 'material-ui/lib/styles/zIndex'
import ThemeManager from 'material-ui/lib/styles/theme-manager'

const themeDef = {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: styles.color.stylized,
    primary2Color: Colors.cyan700,
    primary3Color: Colors.lightBlack,
    accent1Color: styles.color.accent,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: styles.color.stylized
  }
}

export default ThemeManager.getMuiTheme( themeDef )
