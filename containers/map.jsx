import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Map from '../components/map.jsx'
import { getMarkers, getHighlightedMarkers, getActiveMarkers } from '../selectors'

import * as MapActions from '../actions/map-actions'

const { object, arrayOf, string } = PropTypes

class MapContainer extends Component {

  propTypes = {
    MapActions: object,
    activeMarkers: arrayOf( string ),
    events: object,
    highlightedMarkers: arrayOf( string ),
    map: object,
    markers: object
  };

  render() {
    const { map, markers, highlightedMarkers, activeMarkers } = this.props

    return (
      <Map
        markers={ markers }
        active={ activeMarkers }
        highlighted={ highlightedMarkers }
        { ...map } />
    )
  }

}


export default connect(
  state => ({
    events: state.events,
    markers: getMarkers( state ),
    activeMarkers: getActiveMarkers( state ),
    highlightedMarkers: getHighlightedMarkers( state )
  }),
  dispatch => ({
    MapActions: bindActionCreators(MapActions, dispatch)
  })
)( MapContainer )
