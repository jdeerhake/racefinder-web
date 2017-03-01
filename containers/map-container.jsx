import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Map from '../components/map.jsx'
import * as Actions from '../actions'
import { getMapViewport, getMarkers } from '../selectors/index'
import getDefaultLocation from '../lib/default-location'
import { validate as validEvent } from '../adapters/event'
import { validate as validMarker } from '../adapters/marker'

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
    const { mapState, markers, actions: { mapChangeViewport } } = this.props
    const { clientWidth: width, clientHeight: height } = document.body
    return (
      <Map
        markers={ markers }
        mapState={ mapState }
        width={ width }
        height={ height }
        onChangeViewport={ mapChangeViewport } />
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
