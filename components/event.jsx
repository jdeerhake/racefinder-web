import React, { PureComponent, PropTypes } from 'react'
import { validate as validEvent } from '../adapters/event'
import { EVENT_DATE, EVENT_DATE_TIME, EVENT_DATE_TIME_MINS } from '../lib/date-formats'
import Race from './race.jsx'
import CloseIcon from 'material-ui/svg-icons/navigation/close'

import '../styles/event.scss'

const { func } = PropTypes

export default class Event extends PureComponent {

  static propTypes = {
    event: validEvent,
    onClick: func,
    onClose: func
  }

  formattedStartTime = () => {
    const { startDate } = this.props.event
    if( startDate.hour() === 0 ) {
      return startDate.format( EVENT_DATE )
    } else if( startDate.minute() === 0 ) {
      return startDate.format( EVENT_DATE_TIME )
    } else {
      return startDate.format( EVENT_DATE_TIME_MINS )
    }
  };

  getClasses = () => {
    const { active } = this.props.event
    return [
      'event',
      active && 'active focus'
    ].filter( Boolean ).join( ' ' )
  }

  handleClick = () => {
    const { event, onClick } = this.props
    onClick( event )
  }

  handleClose = () => {
    const { event, onClose } = this.props
    onClose( event )
  }

  render() {
    const { event, onClose } = this.props
    const races = event.races.map(( race ) => {
      return <Race key={ race.id } race={ race } />
    })

    return (
      <li className={ this.getClasses() } onClick={ this.handleClick }>
        <i className='close icon icon-times-circle' onClick={ onClose }>
          <CloseIcon style={ { width: '20px', height: '20px' } } />
        </i>
        <a href={ event.infoURL } target='_blank'>
          <h3 className='name'>{ event.name }</h3>
        </a>
        <span className='place'>{ event.location.city }, { event.location.state }</span>
        <span className='date'>{ this.formattedStartTime() }</span>
        <ul className='races'>
          { races }
        </ul>
        <a className='register' target='_blank' href={ event.infoURL }>More information »</a>
      </li>
    )
  }
}
