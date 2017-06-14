import React, { PureComponent } from 'react'
import { object } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import SearchBox from '../components/search-box.jsx'
import SearchLinks from '../components/search-links.jsx'
import MetaInfo, { DEFAULT_DESC } from '../components/meta-info.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RacefinderTheme from '../lib/theme'
import { index as getMarkets } from '../adapters/market'
import { index as getFilterPresets } from '../adapters/filter-preset'
import shuffle from 'lodash/shuffle'

import '../styles/landing-container.scss'

const markets = getMarkets()
const filterPresets = shuffle( getFilterPresets() )

const shuffledMarkets = filterPresets.map( () => shuffle( markets ) )

class LandingContainer extends PureComponent {

  static propTypes = {
    actions: object
  }

  renderSearchLinks = ( filterPreset, i ) => {
    return <SearchLinks key={ filterPreset.id } filterPreset={ filterPreset } markets={ shuffledMarkets[ i ] } />
  }

  render() {
    const { actions: { startSearch } } = this.props

    return (
      <MuiThemeProvider muiTheme={ RacefinderTheme }>
        <div className='landing-container'>
          <MetaInfo />
          <div className='search-header'>
            <h1>RaceFinder</h1>
            <SearchBox onSearch={ startSearch } />
          </div>
          <div className='popular-links'>
            <div className='description'>
              { DEFAULT_DESC }
            </div>
            <h2>Popular Searches</h2>
            { filterPresets.map( this.renderSearchLinks ) }
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
