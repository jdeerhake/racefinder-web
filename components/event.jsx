import React from 'react'
import Race from './race.jsx'
import EventActions from '../actions/event-actions'
import moment from 'moment'

import  '../styles/event.scss'

const { bool, arrayOf, string, object, number } = React.PropTypes

class Event extends React.Component {

  static propTypes = {
    active: bool,
    classes: arrayOf( string ),
    focus: bool,
    id: string,
    index: string,
    infoURL: string,
    location: object,
    logoImage: string,
    name: string,
    races: arrayOf( object ),
    startDate: number
  };

  static defaultProps = {
    classes: [ 'event' ],
    races: []
  };

  classList = () => {
    return this.props.classes
      .concat([
        this.props.active ? 'active' : 'inactive',
        this.props.focus && 'focus'
      ])
      .filter( Boolean )
      .join( ' ' )
  };

  handleMouseEnter = () => {
    if( !this.props.active ) {
      EventActions.highlightEvent( this.props.id )
    }
  };

  handleMouseLeave = () => {
    EventActions.dehighlightEvent( this.props.id )
  };

  handleClick = ( ev ) => {
    if( !this.props.active ) {
      ev.preventDefault()
    }
    EventActions.activateEvent( this.props.id )
  };

  handleClose = ( ev ) => {
    ev.stopPropagation()
    ev.preventDefault()
    EventActions.deactivateAllEvents()
  };

  formattedDate = () => {
    return moment.unix( this.props.startDate ).format( 'MMMM Do (ddd)' )
  };

  formattedStartTime = () => {
    const time = moment.unix( this.props.startDate )
    if( time.format( 'h:mm' ) === '12:00' ) {
      return ''
    } else if( time.format( 'm' ) === '0' ) {
      return time.format( 'ha' )
    } else {
      return time.format( 'h:mma' )
    }
  };

  render() {
    const races = this.props.races.map(( race ) => {
      return <Race key={race.id} {...race} />
    })

    const date = [ this.formattedDate() ]
    if( this.formattedStartTime() ) {
      date.push( this.formattedStartTime() )
    }

    return (
      <li
        className={ this.classList() }
        onMouseEnter={ this.handleMouseEnter }
        onMouseLeave={ this.handleMouseLeave }
        onClick= { this.handleClick }
      >
        <i className='close icon icon-times-circle' onClick={ this.handleClose }></i>
        <span className='index'>{ this.props.index }</span>
        <a href={ this.props.infoURL } target='_blank'><h3 className='name'>{ this.props.name }</h3></a>
        <span className='place'>{ this.props.location.city }, { this.props.location.state }</span>
        <span className='date'>{ date.join( ', ' ) }</span>
        <ul className='races'>
          { races }
        </ul>
        <a className='register' target='_blank' href={ this.props.infoURL }>More information »</a>
      </li>
    )
  }

}

export default Event
