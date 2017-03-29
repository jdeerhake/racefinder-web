import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MapContainer from './map-container.jsx'
import Header from '../components/header.jsx'
import RacefinderTheme from '../lib/theme'
import * as Actions from '../actions'

import '../styles/global.scss'

const { object } = React.PropTypes

class SearchContainer extends Component {

  static contextTypes = {
    router: object
  }

  static propTypes = {
    actions: object,
    params: object
  }

  render() {
    const { params, actions } = this.props

    return (
      <MuiThemeProvider muiTheme={ RacefinderTheme }>
        <div>
          <Header
            onFilterChange={ actions.filterChange }
            filters={ params.filters } />
          <MapContainer params={ params } />
        </div>
      </MuiThemeProvider>
    )
  }

}

export default connect(
  ( state, ownProps ) => ({
    ...state,
    params: {
      ...ownProps.location.query,
      ...ownProps.params
    }
  }),
  dispatch => ({
    actions: bindActionCreators( Actions, dispatch )
  })
)( SearchContainer )
