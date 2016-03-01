import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'
import Snackbar from 'material-ui/lib/snackbar'
import EventList from './event-list.jsx'
import HelpButton from './help-button.jsx'
import EventActions from '../actions/event-actions'
import RequestStore from '../stores/event-requester-store'
import EventStore from '../stores/event-store'
import RequestStatusStore from '../stores/request-status-store'
import Map from './map.jsx'
import Header from './header.jsx'
import { params } from '../lib/history'
import styles from '../lib/styles'

import '../styles/racefinder-app.scss'

function getStateFromStore() {
  return {
    events: _.values( EventStore.getAll() ),
    filters: RequestStore.getAll(),
    hasActiveRequest: !!RequestStatusStore.getActive().length
  }
}

const DEFAULT_ZOOM = 10

import RaceFinderTheme from '../lib/theme'
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator'

@ThemeDecorator( RaceFinderTheme )
class RacefinderApp extends React.Component {

  state = _.extend({
    listWidth: 0,
    mapProps: {
      zoom: parseInt( params().zoom, 10 ) || DEFAULT_ZOOM,
      center: {
        lat: parseFloat( params().lat ) || 34.018418,
        lng: parseFloat( params().lng ) || -118.107009
      },
      styles: require( '../lib/map-styles' )
    }
  }, getStateFromStore() );

  componentDidMount() {
    RequestStore.on( 'change', this.updateStateFromStore )
    EventStore.on( 'change', this.updateStateFromStore )
    RequestStore.on( 'change', this.createSearchEvents )
    RequestStatusStore.on( 'change', this.updateStateFromStore )

    const elWidth = ReactDOM.findDOMNode( this.refs.list ).clientWidth
    this.setState({
      listWidth: elWidth === document.body.clientWidth ? 0 : elWidth
    })
  }

  showNoResults = () => {
    return !this.state.hasActiveRequest && this.state.events.length === 0
  }

  updateStateFromStore = () => {
    this.setState( getStateFromStore() )
  };

  createSearchEvents = _.debounce(() => {
    EventActions.search( RequestStore.getAll() )
  }, 500 );

  render() {
    const progressSize = 50
    const progressLeft = (document.body.clientWidth - this.state.listWidth - progressSize) / 2

    return (
      <span>
        <Header filters={this.state.filters} />
        <RefreshIndicator
          status={this.state.hasActiveRequest ? 'loading' : 'hide'}
          left={progressLeft}
          top={document.body.clientHeight * 0.15}
          size={progressSize}
          loadingColor={styles.color.active} />
        <Map listWidth={this.state.listWidth} {...this.state.mapProps} />
        <EventList ref='list' />
        <Snackbar
          open={ this.showNoResults() }
          message='No results found in this area'
          onRequestClose= { _ } />
        <HelpButton />
      </span>
    )
  }

}

export default RacefinderApp
