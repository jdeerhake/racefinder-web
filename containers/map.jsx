import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { onChangeViewport } from 'redux-map-gl'
import MapGL from 'react-map-gl'
import * as Actions from '../actions'

const { MAPBOX_API_KEY } = process.env

const { object, func } = React.PropTypes

class Map extends Component {

  static propTypes = {
    actions: object,
    mapState: object,
    query: object
  }

  render() {
    const { mapState, actions: { onChangeViewport } } = this.props
    const { clientWidth: width, clientHeight: height } = document.body

    return (
      <MapGL
        { ...mapState }
        width={ width }
        height={ height }
        mapStyle={ 'mapbox://styles/mapbox/outdoors-v9' }
        onChangeViewport={ onChangeViewport }
        mapboxApiAccessToken={ MAPBOX_API_KEY } />
    )

  }

}

export default connect(
  ( state, ownProps ) => ({
    ...state,
    query: ownProps.location.query,
    mapState: state.map.viewport.toJS()
  }),
  dispatch => ({
    actions: bindActionCreators({
      onChangeViewport,
      ...Actions
    }, dispatch )
  })
)( Map )
