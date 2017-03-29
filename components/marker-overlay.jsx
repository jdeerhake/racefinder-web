import React, { Component, PropTypes } from 'react'
import { SVGOverlay } from 'react-map-gl'
import Marker from './marker.jsx'
import { validate as validMarker } from '../adapters/marker'

const { number, bool, element, oneOfType, arrayOf } = PropTypes


export default class MarkerOverlay extends Component {

  static propTypes = {
    children: oneOfType([ element, arrayOf( element ) ]),
    height: number.isRequired,
    isDragging: bool.isRequired,
    markers: arrayOf( validMarker ),
    width: number.isRequired,
    zoom: number.isRequired
  };

  translate = ( opt, { lat, lng }) => {
    const [ x, y ] = opt.project([ lng, lat ])
    return `translate( ${x}px, ${y}px )`
  }

  scale = () => {
    const { zoom } = this.props
    return `scale( ${ (zoom / 10) * .2 } )`
  }

  renderMarker = ( opt, marker ) => {
    const transform = `${this.translate( opt, marker )} ${this.scale()}`
    return (
      <Marker key={ marker.id }
        marker={ marker }
        transform={ transform } />
    )
  };

  redraw = ( opt ) => {
    const { markers } = this.props
    return (
      <g>
        { markers
              .sort(( a, b ) => b.lat - a.lat )
              .map( this.renderMarker.bind( this, opt ) ) }
      </g>
    )
  };

  render() {
    return (
      <SVGOverlay redraw={ this.redraw } { ...this.props } />
    )
  }
}
