import React, { PureComponent, PropTypes } from 'react'
import { SVGOverlay } from 'react-map-gl'
import Marker from './marker.jsx'
import { validate as validMarker } from '../adapters/marker'

const { number, bool, arrayOf, func } = PropTypes


export default class MarkerOverlay extends PureComponent {

  static propTypes = {
    height: number.isRequired,
    isDragging: bool,
    markers: arrayOf( validMarker ),
    onMarkerClick: func,
    width: number.isRequired,
    zoom: number.isRequired
  };

  static defaultProps = {
    isDragging: true
  };

  translate = ( opt, { lat, lng }) => {
    const [ x, y ] = opt.project([ lng, lat ])
    return `translate( ${x}px, ${y}px )`
  }

  scale = () => {
    const { zoom } = this.props
    return `scale( ${ (zoom / 14) * .3 } )`
  }

  renderMarker = ( opt, marker ) => {
    const { onMarkerClick } = this.props
    const transform = `${this.translate( opt, marker )} ${this.scale()}`
    return (
      <Marker key={ marker.id }
        onClick={ onMarkerClick }
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
