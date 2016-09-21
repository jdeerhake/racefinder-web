import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { Map as MapWrapper } from '../lib/map'

const { arrayOf, object, shape, number, func } = PropTypes

export default class Map extends Component {

  static propTypes = {
    center: shape({
      lat: number,
      lng: number
    }),
    children: arrayOf( object ),
    onClick: func,
    onMove: func,
    onZoom: func,
    zoom: number
  };

  static defaultProps = {

  }

  state = {}

  componentWillMount() {
    const { center, zoom } = this.props
    this.setState({
      center,
      zoom
    })
  }

  componentDidMount() {
    const { center, zoom } = this.props
    const el = findDOMNode( this._gmapEl )
    this.map = new MapWrapper( el, { center, zoom })
    this.map.on( 'move', this.handleMove )
    this.map.on( 'zoom', this.handleZoom )
    this.map.on( 'click', this.handleClick )
  }

  componentWillReceiveProps( nextProps ) {
    const { center, zoom } = nextProps

    if( center.lat !== this.props.center.lat ||
        center.lng !== this.props.center.lng ) {
      this.map.move( center )
    }

    if( zoom !== this.props.zoom ) {
      this.map.zoom( zoom )
    }
  }

  handleMove = () => {
    const center = this.map.getCenter()
    const bounds = this.map.getBounds()
    this.setState({ center })
    this.props.onMove({ center, bounds })
  }

  handleZoom = () => {
    const zoom = this.map.getZoom()
    this.setState({ zoom })
    this.props.onZoom( zoom )
  }

  render() {

    return (
      <div ref={ r => this._gmapEl = r }>
        { this.props.children }
      </div>
    )
  }
}
