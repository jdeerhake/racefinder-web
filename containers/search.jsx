import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MapContainer from './map-container.jsx'
import Header from '../components/header.jsx'
import EventList from '../components/event-list.jsx'
import RacefinderTheme from '../lib/theme'
import * as Actions from '../actions'
import { getEventsWithStatus } from '../selectors/index'

import '../styles/global.scss'

const { object, shape, arrayOf } = React.PropTypes

class SearchContainer extends PureComponent {

  static contextTypes = {
    router: object
  };

  static propTypes = {
    actions: object,
    events: arrayOf( object ),
    filter: shape({
      options: object,
      selected: object
    }),
    params: object
  };

  activateEvent = ({ id }) => {
    this.props.actions.activateEvents({ eventIDs: [ id ] })
  };

  highlightEvent = ({ id }) => {
    this.props.actions.highlightEvents({ eventIDs: [ id ] })
  };

  render() {
    const { params, actions, filter, events } = this.props

    return (
      <MuiThemeProvider muiTheme={ RacefinderTheme }>
        <div>
          <Header
            onFilterChange={ actions.filterChange }
            filter={ filter } />
          <MapContainer params={ params } />
          <EventList
            activateEvent={ this.activateEvent }
            deactivateAllEvents={ actions.deactivateAllEvents }
            highlightEvent={ this.highlightEvent }
            events={ events } />
        </div>
      </MuiThemeProvider>
    )
  }

}

export default connect(
  ( state, ownProps ) => ({
    ...state,
    events: getEventsWithStatus( state ),
    params: {
      ...ownProps.location.query,
      ...ownProps.params
    }
  }),
  dispatch => ({
    actions: bindActionCreators( Actions, dispatch )
  })
)( SearchContainer )
