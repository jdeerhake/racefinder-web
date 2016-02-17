import React from 'react'
import Race from './race.jsx'
import EventActions from '../actions/event-actions'
import moment from 'moment'

import  '../styles/event.scss'

class Event extends React.Component {

  static propTypes = {
    active: React.PropTypes.bool,
    classes: React.PropTypes.arrayOf( React.PropTypes.string ),
    id: React.PropTypes.string,
    index: React.PropTypes.string,
    infoURL: React.PropTypes.string,
    location: React.PropTypes.object,
    logoImage: React.PropTypes.string,
    name: React.PropTypes.string,
    races: React.PropTypes.arrayOf( React.PropTypes.object ),
    startDate: React.PropTypes.number
  };

  static defaultProps = {
    classes: [ 'event' ]
  };

  classList = () => {
    return this.props.classes
      .concat( this.props.active ? 'active' : 'inactive' )
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
    if( time.format( 'm' ) === '0' ) {
      return time.format( 'ha' )
    } else {
      return time.format( 'h:mma' )
    }
  };

  render() {
    let races = this.props.races.map(( race ) => {
      return <Race key={race.id} {...race} />
    })

    let image = this.props.logoImage ?  <img src={ this.props.logoImage } /> : ''

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
        <span className='date'>{ this.formattedDate() }, { this.formattedStartTime() }</span>
        { image }
        <ul className='races'>
          { races }
        </ul>
      </li>
    )
  }

}

export default Event
