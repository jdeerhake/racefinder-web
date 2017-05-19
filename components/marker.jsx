import React, { PureComponent } from 'react'
import { validate as validMarker } from '../adapters/marker'
import { paths, ACTIVE_ICON, HIGHLIGHTED_ICON, INACTIVE_ICON } from '../lib/marker-styles'

const { ROUND_PIN } = paths
const { string, func } = React.PropTypes

const CLICK_AREA_STYLE = {
  stroke: 'transparent',
  strokeWidth: '20px',
  cursor: 'pointer',
  pointerEvents: 'all'
}

export default class Marker extends PureComponent {

  static propTypes = {
    marker: validMarker,
    onClick: func,
    transform: string
  };

  handleClick = ( ev ) => {
    const { onClick, marker } = this.props
    onClick( marker )
    ev.stopPropagation()
  }

  getStatusStyle = () => {
    const { active, highlighted } = this.props.marker

    if( active ) {
      return ACTIVE_ICON
    } else if( highlighted ) {
      return HIGHLIGHTED_ICON
    } else {
      return INACTIVE_ICON
    }
  }

  getStyle = () => {
    const { transform } = this.props
    return {
      ...this.getStatusStyle(),
      transform
    }
  }

  render() {
    const { transform } = this.props

    return (
      <g>
        <path
          d={ ROUND_PIN }
          onMouseDown={ ( ev ) => ev.stopPropagation() }
          onMouseUp={ ( ev ) => ev.stopPropagation() }
          onClick={ this.handleClick }
          style={ { transform, ...CLICK_AREA_STYLE } } />
        <path
          d={ ROUND_PIN }
          style={ this.getStyle() } />
      </g>
    )
  }
}
