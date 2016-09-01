import React, { Component } from 'react'
import { validate as validMarker } from '../adapters/marker'
import { paths, ACTIVE_ICON, HIGHLIGHTED_ICON, INACTIVE_ICON } from '../lib/marker-styles'

const { ROUND_PIN } = paths
const { string } = React.PropTypes

export default class Marker extends Component {

  static propTypes = {
    marker: validMarker,
    transform: string
  };

  render() {
    const { transform } = this.props

    return (
      <path
        d={ ROUND_PIN }
        style={ {
          ...ACTIVE_ICON,
          transform
        } } />
    )
  }
}
