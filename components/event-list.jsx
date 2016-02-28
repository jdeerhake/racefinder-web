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
    return this.props.classes.concat([
      !this.state.events.length && 'empty',
      !!this.state.activeEventIDs.length  && 'has-active'
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
    return <li className='next' onClick={ this.focusNext }>»</li>
  };

  renderPrev = () => {
    return <li className='prev' onClick={ this.focusPrev }>«</li>
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
        { this.state.focus > 0 && this.renderPrev() }
        { this.state.focus < ( this.state.activeEventIDs.length - 1 ) && this.renderNext() }
      </ul>
    )
  }
}

export default EventList
