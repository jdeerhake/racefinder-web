import React, { PureComponent, PropTypes } from 'react'
import Event from './event.jsx'
import FocusSelector from './focus-selector.jsx'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import { validate as validEvent } from '../adapters/event'
import last from 'lodash/last'
import filter from 'lodash/filter'

import '../styles/event-list.scss'

const { arrayOf, func } = PropTypes

export default class EventList extends PureComponent {

  static propTypes = {
    activateEvent: func,
    deactivateAllEvents: func,
    deactivateEvent: func,
    events: arrayOf( validEvent ),
    highlightEvent: func
  }

  componentWillUpdate(nextProps) {
    if( nextProps.events !== this.props.events ) {
      this._listEl.scrollTop = 0
    }
  }

  componentDidUpdate() {
    this.scrollToActive()
  }

  scrollToActive = () => {
    const firstActive = this.activeEventIDs()[0]
    if( firstActive ) {
      this._listEl.scrollTop = this._eventEls[firstActive]._el.offsetTop - 20
    }
  }

  focusIndex = () => {
    return Math.max( this.activeEventIDs().indexOf( this.highlightedEventID() ), 0 )
  }

  activeEventIDs = (props) => {
    const { events } = props || this.props
    return filter( events, 'active' ).map( e => e.id )
  }

  highlightedEventID = () => {
    const highlighted  = filter( this.props.events, 'highlighted' )
    return highlighted.length ? last( highlighted ).id : undefined
  }

  getClassName = () => {
    const numActive = this.activeEventIDs().length

    return [
      'event-list',
      numActive && 'has-active',
      numActive > 1 && 'has-multiple-active'
    ].filter( Boolean ).join( ' ' )
  }

  renderNav = () => {
    const { highlightEvent, deactivateAllEvents } = this.props

    return (
      <li className='nav'>
        <FocusSelector
          activeEventIDs={ this.activeEventIDs() }
          highlightEvent={ highlightEvent }
          highlightedEventID={ this.highlightedEventID() } />

        <i className='close icon icon-times-circle' onClick={ deactivateAllEvents }>
          <CloseIcon style={ { width: '20px', height: '20px' } } />
        </i>
      </li>
    )
  };

  render() {
    window.evs = this._eventEls = {}
    const { activateEvent, deactivateEvent } = this.props
    const focusPosition =  { left: `-${this.focusIndex() * 100}%` }
    const events = this.props.events.map( event => (
      <Event key={ event.id }
        ref={ cmp => this._eventEls[event.id] = cmp }
        event={ event }
        onClick={ activateEvent }
        onClose={ deactivateEvent }  />
    ))

    return (
      <ul className={ this.getClassName() } style={ focusPosition } ref={ el => this._listEl = el }>
        { this.renderNav() }
        { events }
      </ul>
    )
  }

}
