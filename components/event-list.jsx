import React from 'react'
import ReactDOM from 'react-dom'
import EventStore from '../stores/event-store'
import ActiveEventStore from '../stores/active-event-store'
import Event from './event.jsx'
import _ from 'lodash'

import '../styles/event-list.scss'

function getStateFromStore() {
  return {
    focus: 0,
    activeEventIDs: ActiveEventStore.getActive(),
    events: _.values( EventStore.getAll() )
  }
}

class EventList extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    classes: React.PropTypes.arrayOf( React.PropTypes.string )
  };

  static defaultProps = {
    classes: [ 'event-list' ]
  };

  state = getStateFromStore();

  componentDidMount() {
    EventStore.addChangeListener( this.onEventChange )
    ActiveEventStore.addChangeListener( this.onEventChange )
  }

  componentDidUpdate() {
    this.scrollToActive()
  }

  onEventChange = () => {
    this.setState( getStateFromStore() )
  };

  classList = () => {
    const { activeEventIDs } = this.state
    return this.props.classes.concat([
      !this.state.events.length && 'empty',
      !!activeEventIDs.length  && 'has-active'
    ].filter( Boolean )).join( ' ' )
  };

  scrollToActive = () => {
    let top =  Math.min(...ActiveEventStore.getActive()
                            .map( id => ReactDOM.findDOMNode( this.refs[id] ).offsetTop ))

    if( typeof top !== 'undefined' ) {
      this.scrollTo( top - 15 )
    }
  };

  scrollTo = ( y ) => {
    ReactDOM.findDOMNode( this.refs.list ).scrollTop = y
  };

  focusNext = () => {
    this.setState({ focus: this.state.focus + 1 })
  };

  focusPrev = () => {
    this.setState({ focus: this.state.focus - 1 })
  };

  renderNext = () => {
    const enabled = this.state.focus < ( this.state.activeEventIDs.length - 1 )
    const classes = [
      'next',
      enabled ? 'enabled' : 'disabled'
    ]
    return (
      <span className={ classes.join( ' ' ) } onClick={ enabled && this.focusNext }>»</span>
    )
  };

  renderPrev = () => {
    const enabled = this.state.focus > 0
    const classes = [
      'prev',
      enabled ? 'enabled' : 'disabled'
    ]
    return (
      <span className={ classes.join( ' ' ) } onClick={ enabled && this.focusPrev }>«</span>
    )
  };

  renderPage = () => {
    return (
      <span className='page'>
        { this.state.focus + 1 } / { this.state.activeEventIDs.length }
      </span>
    )
  };

  renderNav = () => {
    return (
      <li className='nav'>
        { this.renderPrev() }
        { this.renderPage() }
        { this.renderNext() }
      </li>
    )
  };

  closeShowNoResults = () => {
    this.setState({ showNoResults: false })
  };

  render() {
    let events = this.state.events.sort(( a, b ) => a.sortWith( b )).map( event => {
      const activeIndex = this.state.activeEventIDs.indexOf( event.id )
      return (
        <Event ref={ event.id }
               key={ event.id }
               focus={ activeIndex === this.state.focus }
               active={ activeIndex > -1 }
               {...event} />
      )
    })

    return (
      <ul ref='list' className={ this.classList() }>
        { events }
        { this.state.activeEventIDs.length > 1 && this.renderNav() }
      </ul>
    )
  }
}

export default EventList
