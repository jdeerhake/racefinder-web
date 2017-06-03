import React, { PureComponent } from 'react'
import MapGL from 'react-map-gl'
import MarkerOverlay from './marker-overlay.jsx'
import pick from 'lodash/pick'
import debounce from 'lodash/debounce'
import inRange from 'lodash/inRange'

// webpack define plugin is dumb, so no destrucuring
const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY
const MAPBOX_MAP_URL = process.env.MAPBOX_MAP_URL

const { object, number, func, arrayOf } = React.PropTypes

const MOVE_PARAMS = [ 'latitude', 'longitude', 'zoom' ]
const MOVE_SENSITIVITY = 0.01

export default class Map extends PureComponent {

  static foo = 'bar'

  static propTypes = {
    actions: object,
    height: number,
    initialState: object,
    markers: arrayOf( object ),
    onInit: func,
    onMarkerClick: func,
    onMove: func,
    params: object,
    width: number
  }

  static defaultProps = {
    onInit: () => {}
  }

  constructor( props ) {
    super( props )
    this.state = {
      viewport: {
        ...props.initialState
      }
    }
  }

  componentDidMount() {
    const { onInit } = this.props
    onInit({ boundsGetter: this.getBounds })
  }

  componentWillReceiveProps( nextProps ) {
    if( nextProps.initialState !== this.props.initialState ) {
      this.setState({ viewport: {
        ...this.state.viewport,
        ...nextProps.initialState
      } } )
    }
  }

  isMoved = ( newView, oldView ) => {
    return MOVE_PARAMS.some( p => newView[ p ] !== oldView[ p ] ) &&
      !MOVE_PARAMS.every( p => inRange( newView[ p ], oldView[ p ] - MOVE_SENSITIVITY, oldView[ p ] + MOVE_SENSITIVITY ))
  }

  triggerMove = debounce( () => {
    const { viewport } = this.state
    const { onMove } = this.props
    onMove({ ...pick( viewport, MOVE_PARAMS ) })
  }, 100 );

  handleViewportChange = ( params ) => {
    if( this.isMoved( params, this.state.viewport ) ) {
      this.triggerMove()
    }
    this.setState({ viewport: params })
  };

  getBounds = () => {
    if( this.mapGL ) {
      const bounds = this.mapGL._map._map.getBounds()
      return{
        n: bounds.getNorth(),
        s: bounds.getSouth(),
        e: bounds.getEast(),
        w: bounds.getWest()
      }
    }
  }


  render() {
    const { width, height, markers, onMarkerClick } = this.props
    const { viewport } = this.state

    return (
      <MapGL
        { ...viewport }
        ref={ map => this.mapGL = map }
        width={ width }
        height={ height }
        mapStyle={ MAPBOX_MAP_URL }
        onViewportChange={ this.handleViewportChange }
        mapboxApiAccessToken={ MAPBOX_API_KEY }>
        <MarkerOverlay
          { ...viewport }
          height={ height }
          width={ width }
          markers={ markers }
          onMarkerClick={ onMarkerClick } />
      </MapGL>
    )

  }
}
