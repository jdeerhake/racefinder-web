import React, { PureComponent, PropTypes } from 'react'
import Event from './event.jsx'
import { validate as validEvent } from '../adapters/event'

import '../styles/event-list.scss'

const { arrayOf, func } = PropTypes

export default class EventList extends PureComponent {

  static propTypes = {
    activateEvent: func,
    deactiveEvent: func,
    events: arrayOf( validEvent ),
    highlightEvent: func
  }

  getClassName = () => {
    const { events } = this.props

    return [
      'event-list',
      events.some( e => e.active ) && 'has-active'
    ].filter( Boolean ).join( ' ' )
  }

  render() {
    const events = this.props.events.map( event => (
      <Event key={ event.id } onClose={ this.deactiveEvent } event={ event } />
    ))

    return (
      <ul className={ this.getClassName() }>
        { events }
      </ul>
    )
  }

}
