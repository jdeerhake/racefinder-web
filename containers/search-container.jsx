import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MapContainer from './map-container.jsx'
import Header from '../components/header.jsx'
import EventList from '../components/event-list.jsx'
import HelpButton from '../components/help-button.jsx'
import RacefinderTheme from '../lib/theme'
import * as Actions from '../actions'
import { getEventsWithStatus } from '../selectors/index'

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
    history: object,
    params: object
  };

  activateEvent = ({ id }) => {
    this.props.actions.activateEvents({ eventIDs: [ id ] })
  };

  highlightEvent = ({ id }) => {
    this.props.actions.highlightEvents({ eventIDs: [ id ] })
  };

  goHome = () => {
    this.context.router.push( '/' )
  }

  render() {
    const { params, actions, filter, events } = this.props

    return (
      <MuiThemeProvider muiTheme={ RacefinderTheme }>
        <div>
          <Header
            onFilterChange={ actions.filterChange }
            onTitleClick={ this.goHome }
            filter={ filter } />
          <MapContainer params={ params } />
          <EventList
            activateEvent={ this.activateEvent }
            deactivateAllEvents={ actions.deactivateAllEvents }
            highlightEvent={ this.highlightEvent }
            events={ events } />
          <HelpButton />
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
