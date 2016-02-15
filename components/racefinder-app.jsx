import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import Busy from './busy.jsx'
import EventList from './event-list.jsx'
import EventActions from '../actions/event-actions'
import RequestStore from '../stores/event-requester-store'
import RequestStatusStore from '../stores/request-status-store'
import Map from './map.jsx'
import Header from './header.jsx'

import '../styles/racefinder-app.scss'

function getStateFromStore() {
  return {
    filters: RequestStore.getAll(),
    hasActiveRequest: !!RequestStatusStore.getActive().length
  }
}

class RacefinderApp extends React.Component {

  state = _.extend({
    listWidth: 0
  }, getStateFromStore() );

  componentDidMount() {
    this.setState({
      listWidth:  ReactDOM.findDOMNode( this.refs.list ).clientWidth
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
  }, 1500 );

  render() {
    return (
      <div id='app'>
        <Header filters={this.state.filters} />
        <Busy active={this.state.hasActiveRequest} />
        <Map
          listWidth={this.state.listWidth}
          zoom={11}
          styles={require( '../lib/map-styles' )}
          center={new google.maps.LatLng( 34.4324414, -119.6967455 )} />
        <EventList ref='list' />
      </div>
    )
  }

}

export default RacefinderApp
