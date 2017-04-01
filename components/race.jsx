import React, { PureComponent, PropTypes } from 'react'
import { validate as validRace } from '../adapters/race'

import '../styles/race.scss'

export default class Race extends PureComponent {

  static propTypes = {
    race: validRace
  }

  hasShortDescription = () => {
    const { race } = this.props
    return race.description && race.description.length < 20
  };

  render() {
    const info = [ this.props.race.name ]
    if( this.hasShortDescription() ) {
      info.push( this.props.race.description )
    }

    return (
      <li className='race'>
        <span className='name'>{ info.join( ', ' ) }</span>
      </li>
    )
  }

}
