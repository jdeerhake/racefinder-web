import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'
import EventList from './event-list.jsx'
import EventActions from '../actions/event-actions'
import RequestStore from '../stores/event-requester-store'
import RequestStatusStore from '../stores/request-status-store'
import Map from './map.jsx'
import Header from './header.jsx'
import styles from '../lib/styles'

import '../styles/racefinder-app.scss'

function getStateFromStore() {
  return {
    filters: RequestStore.getAll(),
    hasActiveRequest: !!RequestStatusStore.getActive().length
  }
}

const DEFAULT_ZOOM = 10

class RacefinderApp extends React.Component {

  state = _.extend({
    listWidth: 0,
    mapProps: {
      zoom: DEFAULT_ZOOM,
      center: { lat: 54.018418, lng: -118.107009 },
      styles: require( '../lib/map-styles' )
    }
  }, getStateFromStore() );

  componentDidMount() {
    const elWidth = ReactDOM.findDOMNode( this.refs.list ).clientWidth
    this.setState({
      listWidth: elWidth === document.body.clientWidth ? 0 : elWidth
    })

    RequestStore.on( 'change', this.updateStateFromStore )
    RequestStore.on( 'change', this.createSearchEvents )
    RequestStatusStore.on( 'change', this.updateStateFromStore )
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
      <div id='app'>
        <Header filters={this.state.filters} />
        <RefreshIndicator
          status={this.state.hasActiveRequest ? 'loading' : 'hide'}
          left={progressLeft}
          top={document.body.clientHeight * 0.15}
          size={progressSize}
          loadingColor={styles.color.active} />
        <Map listWidth={this.state.listWidth} {...this.state.mapProps} />
        <EventList ref='list' />
      </div>
    )
  }

}

export default RacefinderApp
