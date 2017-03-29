import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Map from '../components/map.jsx'
import * as Actions from '../actions'
import { getMapViewport, getMarkers } from '../selectors/index'
import getDefaultLocation from '../lib/default-location'
import { validate as validEvent } from '../adapters/event'
import { validate as validMarker } from '../adapters/marker'

import '../styles/map.scss'

const { object, arrayOf } = React.PropTypes

class MapContainer extends Component {

  static propTypes = {
    actions: object,
    events: arrayOf( validEvent ),
    mapState: object,
    markers: arrayOf( validMarker ),
    params: object
  }

  componentDidMount() {
    const { params, actions: { mapChangeViewport } } = this.props
    getDefaultLocation( params ).then( loc => mapChangeViewport( loc ))
  }

  render() {
    const { mapState, markers, actions: { mapChangeViewport, mapInit } } = this.props
    const { clientWidth: width, clientHeight: height } = document.body
    return (
      <Map
        markers={ markers }
        mapState={ mapState }
        width={ width }
        height={ height - 64 }
        onChangeViewport={ mapChangeViewport }
        onInit={ mapInit } />
    )

  }

}

export default connect(
  ( state, ownProps ) => ({
    ...state,
    params: ownProps.params,
    mapState: getMapViewport( state ),
    markers: getMarkers( state )
  }),
  dispatch => ({
    actions: bindActionCreators( Actions, dispatch )
  })
)( MapContainer )
