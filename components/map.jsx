import React, { Component } from 'react'
import MapGL from 'react-map-gl'
import MarkerOverlay from './marker-overlay.jsx'

// webpack define plugin is dumb, so no destrucuring
const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY
const MAPBOX_MAP_URL = process.env.MAPBOX_MAP_URL

const { object, number, func, arrayOf } = React.PropTypes

export default class Map extends Component {

  static propTypes = {
    actions: object,
    height: number,
    mapState: object,
    markers: arrayOf( object ),
    onChangeViewport: func,
    onInit: func,
    params: object,
    width: number
  }

  static defaultProps = {
    onInit: () => {}
  }

  componentDidMount() {
    const { onInit } = this.props
    onInit({ boundsGetter: this.getBounds })
    // Trigger an initial change to get bounds
    // const map = this.mapGL._getMap()
    // this.handleViewportChange(map);
    // this.mapGL._callOnChangeViewport( map.transform )
  }

  handleViewportChange = ( params ) => {
    const { onChangeViewport } = this.props
    onChangeViewport({ ...params })
  };

  getBounds = () => {
    if( this.mapGL ) {
      const bounds = this.mapGL._getMap().getBounds()
      return{
        n: bounds.getNorth(),
        s: bounds.getSouth(),
        e: bounds.getEast(),
        w: bounds.getWest()
      }
    }
  }

  render() {
    const { mapState, width, height, markers } = this.props

    return (
      <MapGL
        { ...mapState }
        ref={ map => this.mapGL = map }
        width={ width }
        height={ height }
        mapStyle={ MAPBOX_MAP_URL }
        onChangeViewport={ this.handleViewportChange }
        mapboxApiAccessToken={ MAPBOX_API_KEY }>
        <MarkerOverlay
          { ...mapState }
          height={ height }
          width={ width }
          markers={ markers } />
      </MapGL>
    )

  }
}
