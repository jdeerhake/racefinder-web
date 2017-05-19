import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './lib/configure-store'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import Landing from './containers/landing-container.jsx'
import Search from './containers/search-container.jsx'

import './styles/global.scss'

const store = configureStore()
const history = syncHistoryWithStore( browserHistory, store )



ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history }>
      <Route path='/map/:marketSlug/:filterPresetSlug' component={ Search } />
      <Route path='/map' component={ Search } />
      <Route path='/' component={ Landing } />
      <Route path='*' component={ Landing } />
    </Router>
  </Provider>,
  document.getElementById( 'app' )
)
