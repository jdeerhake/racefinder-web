import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './lib/configure-store'

import Landing from './containers/landing.jsx'
import Map from './containers/map.jsx'

const store = configureStore()
const history = syncHistoryWithStore( browserHistory, store )

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history }>
      { /* <Route path='/' component={ Landing } /> */ }
      <Route path='/map/:citySlug' component={ Map } />
      <Route path='*' component={ Map } />
    </Router>
  </Provider>,
  document.getElementById( 'app' )
)
