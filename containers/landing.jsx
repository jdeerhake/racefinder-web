import React, { PureComponent, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import SearchBox from '../components/search-box.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RacefinderTheme from '../lib/theme'

import '../styles/landing-container.scss'

import { index as getFilterPresets } from '../adapters/filter-preset'

const { object, arrayOf, shape, string } = PropTypes


class LandingContainer extends PureComponent {

  static propTypes = {
    actions: object
  }

  render() {
    const { actions: { startSearch } } = this.props

    return (
      <MuiThemeProvider muiTheme={ RacefinderTheme }>
        <div className='landing-container'>
          <div className='search-header'>
            <h1>RaceFinder</h1>
            <SearchBox
              filterPresets={ getFilterPresets() }
              onSearch={ startSearch } />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

}

export default connect(
  ( state, ownProps ) => ({
    ...state,
    params: ownProps.params
  }),
  dispatch => ({
    actions: bindActionCreators( Actions, dispatch )
  })
)( LandingContainer )
