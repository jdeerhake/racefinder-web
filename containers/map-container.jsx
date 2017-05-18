import React, { PureComponent, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Map from '../components/map.jsx'
import * as Actions from '../actions'
import { getMarkers, getEventsWithStatus } from '../selectors/index'
import getDefaultLocation from '../lib/default-location'
import { validate as validEvent } from '../adapters/event'
import { validate as validMarker } from '../adapters/marker'
import { showBySlug as getFilterPreset } from '../adapters/filter-preset'

import '../styles/map.scss'

const { object, arrayOf, shape, string } = PropTypes

class MapContainer extends PureComponent {

  static propTypes = {
    actions: object,
    events: arrayOf( validEvent ),
    map: object,
    markers: arrayOf( validMarker ),
    params: shape({
      marketSlug: string,
      filterPresetSlug: string,
      lat: string,
      lng: string,
      zoom: string
      // + filters
    })
  }

  componentDidMount() {
    const { params, actions: { mapInitialState } } = this.props
    const { filters } = getFilterPreset( params.filterPresetSlug ) || {}
    getDefaultLocation( params ).then( viewport => mapInitialState({
      viewport,
      filters
    }))
  }

  activateMarkerEvents = ({ eventIDs }) => {
    this.props.actions.activateEvents({ eventIDs })
  };

  render() {
    const { map: { initialViewport }, markers, actions: { mapMove, mapInit } } = this.props
    const { clientWidth: width, clientHeight: height } = document.body
    return (
      <Map
        markers={ markers }
        initialState={ initialViewport }
        width={ width }
        height={ height - 64 }
        onMove={ mapMove }
        onMarkerClick={ this.activateMarkerEvents }
        onInit={ mapInit } />
    )

  }

}

export default connect(
  ( state, ownProps ) => ({
    ...state,
    events: getEventsWithStatus( state ),
    params: ownProps.params,
    markers: getMarkers( state )
  }),
  dispatch => ({
    actions: bindActionCreators( Actions, dispatch )
  })
)( MapContainer )
