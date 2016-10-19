import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MapGL from 'react-map-gl'
import * as Actions from '../actions'
import getDefaultLocation from '../lib/default-location'

const { MAPBOX_API_KEY, MAPBOX_MAP_URL } = process.env

const { object } = React.PropTypes

class Map extends Component {

  static contextTypes = {
    router: object
  }

  static propTypes = {
    actions: object,
    mapState: object,
    params: object
  }

  componentDidMount() {
    const { params, actions: { mapChangeViewport } } = this.props
    getDefaultLocation( params ).then( loc => mapChangeViewport( loc ))
  }

  handleViewportChange = ( params ) => {
    const { actions: { mapChangeViewport } } = this.props
    mapChangeViewport({ ...params, bounds: this.getBounds() })
  };

  getBounds = () => {
    if( this.mapGL ) {
      const bounds = this.mapGL._getMap().getBounds()

      return {
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest()
      }
    }
  }

  render() {
    const { mapState } = this.props
    const { clientWidth: width, clientHeight: height } = document.body

    return (
      <MapGL
        { ...mapState }
        ref={ map => this.mapGL = map }
        width={ width }
        height={ height }
        mapStyle={ MAPBOX_MAP_URL }
        onChangeViewport={ this.handleViewportChange }
        mapboxApiAccessToken={ MAPBOX_API_KEY } />
    )

  }

}

export default connect(
  ( state, ownProps ) => ({
    ...state,
    params: {
      ...ownProps.location.query,
      ...ownProps.params
    },
    mapState: state.map.viewport.toJS()
  }),
  dispatch => ({
    actions: bindActionCreators( Actions, dispatch )
  })
)( Map )
