import * as Colors from 'material-ui/styles/colors'
import Spacing from 'material-ui/styles/spacing'
import zIndex from 'material-ui/styles/zIndex'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const styles = {
  color: {
    stylized: '#1695A3',
    accent: '#00BCD4'
  }
}

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
    disabledColor: Colors.darkBlack,
    pickerHeaderColor: styles.color.stylized
  }
}

export default getMuiTheme( themeDef )
