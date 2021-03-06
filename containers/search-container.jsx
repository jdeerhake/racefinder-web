import React, { PureComponent } from 'react'
import { object, arrayOf } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MapContainer from './map-container.jsx'
import Header from '../components/header.jsx'
import EventList from '../components/event-list.jsx'
import HelpButton from '../components/help-button.jsx'
import MetaInfo from '../components/meta-info.jsx'
import RacefinderTheme from '../lib/theme'
import * as Actions from '../actions'
import { getEventsWithStatus, getFilters, getFilterPreset, getSelectedMarket } from '../selectors/index'
import { validate as validFilter } from '../adapters/filter'
import { validate as validMarket } from '../adapters/market'

class SearchContainer extends PureComponent {

  static contextTypes = {
    router: object
  };

  static propTypes = {
    actions: object,
    events: arrayOf( object ),
    filterPreset: object,
    history: object,
    params: object,
    selectedFilter: validFilter,
    selectedMarket: validMarket
  };

  componentWillReceiveProps( nextProps ) {
    const { filterPreset, actions: { fetchEvents } } = this.props
    if( nextProps.filterPreset && nextProps.filterPreset !== filterPreset ) {
      return fetchEvents()
    }
  }

  activateEvent = ({ id }) => {
    this.props.actions.activateEvents({ eventIDs: [ id ] })
  };

  highlightEvent = ({ id }) => {
    this.props.actions.highlightEvents({ eventIDs: [ id ] })
  };

  render() {
    const { params, actions, selectedFilter, events, filterPreset, selectedMarket } = this.props

    return (
      <MuiThemeProvider muiTheme={ RacefinderTheme }>
        <div>
          <MetaInfo
            market={ selectedMarket }
            filterPreset={ filterPreset } />
          <Header
            onFilterChange={ actions.filterChange }
            selectedFilter={ selectedFilter } />
          <MapContainer params={ params } />
          <EventList
            activateEvent={ this.activateEvent }
            deactivateAllEvents={ actions.deactivateAllEvents }
            highlightEvent={ this.highlightEvent }
            marketTeaser={ selectedMarket }
            events={ events } />
          <HelpButton />
        </div>
      </MuiThemeProvider>
    )
  }

}

export default connect(
  ( state, ownProps ) => {
    const params = {
      ...ownProps.location.query,
      ...ownProps.params
    }

    return {
      ...state,
      events: getEventsWithStatus( state ),
      selectedFilter: getFilters( state ),
      filterPreset: getFilterPreset( state ),
      selectedMarket: getSelectedMarket( state ),
      params
    }
  },
  dispatch => ({
    actions: bindActionCreators( Actions, dispatch )
  })
)( SearchContainer )
