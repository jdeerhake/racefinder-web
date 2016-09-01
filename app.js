import React from 'react'
import ReactDOM from 'react-dom'
import TapPlugin from 'react-tap-event-plugin'
import App from './containers/racefinder-app.jsx'

import './styles/global.scss'

TapPlugin()

ReactDOM.render(
  React.createElement( App ),
  document.getElementById( 'app' )
)
