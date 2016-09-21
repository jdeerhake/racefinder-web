import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import debounce from 'lodash/debounce'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'
import Snackbar from 'material-ui/lib/snackbar'
import EventList from '../components/event-list.jsx'
import HelpButton from '../components/help-button.jsx'
import Map from '../components/map.jsx'
import Header from '../components/header.jsx'
import styles from '../lib/styles'

import * as EventActions from '../actions/event-actions'
import * as MapActions from '../actions/map-actions'
import * as FilterActions from '../actions/filter-actions'
import * as LayoutActions from '../actions/layout-actions'

import '../styles/racefinder-app.scss'

import RaceFinderTheme from '../lib/theme'
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator'

const { object, arrayOf, number } = PropTypes

@ThemeDecorator( RaceFinderTheme )
class RacefinderApp extends Component {

  propTypes = {
    EventActions: object,
    FilterActions: object,
    LayoutActions: object,
    MapActions: object,
    activeEvents: arrayOf( number ),
    events: object,
    filter: object,
    highlightedEvents: arrayOf( number ),
    layout: object,
    map: object,
    requests: object
  };

  componentDidMount() {
    const { setListWidth } = this.props.LayoutActions
    const elWidth = ReactDOM.findDOMNode( this._list ).clientWidth
    setListWidth({
      listWidth: elWidth === document.body.clientWidth ? 0 : elWidth
    })
  }

  hasActiveRequest = () => {
    const { requests } = this.props
    return !!requests.EVENT_SEARCH
  };

  showNoResults = () => {
    return !this.hasActiveRequest() && this.state.events.length === 0
  }

  createSearchEvents = debounce(() => {
    const { EventActions, filter } = this.props
    EventActions.search( filter )
  }, 500 );

  render() {
    const { filter, layout, map } = this.props
    const progressSize = 50
    const progressLeft = (document.body.clientWidth - layout.listWidth - progressSize) / 2

    return (
      <span>
        <Header filters={ filter } />
        <RefreshIndicator
          status={ this.hasActiveRequest() ? 'loading' : 'hide' }
          left={ progressLeft }
          top={ document.body.clientHeight * 0.15 }
          size={ progressSize }
          loadingColor={ styles.color.active } />
        <Map listWidth={ layout.listWidth } { ...this.state.mapProps } />
        <EventList ref={ r => this._list = r } />
        <Snackbar
          open={ this.showNoResults() }
          message='No results found in this area'
          onRequestClose={ () => {} } />
        <HelpButton />
      </span>
    )
  }

}


export default connect(
  state => ({
    ...state
  }),
  dispatch => ({
    EventActions: bindActionCreators(EventActions, dispatch),
    FilterActions: bindActionCreators(FilterActions, dispatch),
    LayoutActions: bindActionCreators(LayoutActions, dispatch),
    MapActions: bindActionCreators(MapActions, dispatch)
  })
)(RacefinderApp)
