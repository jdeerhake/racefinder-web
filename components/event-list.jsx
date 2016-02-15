import React from 'react'
import ReactDOM from 'react-dom'
import EventStore from '../stores/event-store'
import ActiveEventStore from '../stores/active-event-store'
import Event from './event.jsx'

import '../styles/event-list.scss'

function getStateFromStore() {
  return {
    activeEventIDs: ActiveEventStore.getActive(),
    events: EventStore.getAllSorted()
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
    return this.props.classes
      .concat( React.Children.count( this.props.children ) === 0 ? 'empty' : false )
      .concat( this.state.activeEventIDs.length ? 'has-active' : false )
      .filter( Boolean )
      .join( ' ' )
  };

  scrollToActive = () => {
    let top =  Math.min(...ActiveEventStore.getActive()
                            .map( id => ReactDOM.findDOMNode( this.refs[id] ).offsetTop ))

    if( typeof top !== 'undefined' ) {
      this.scrollTo( top )
    }
  };

  scrollTo = ( y ) => {
    ReactDOM.findDOMNode( this.refs.list ).scrollTop = y
  };

  render() {
    let events = this.state.events.sort(( a, b ) => {
      return a.sortWith( b )
    }).map( event => {
      let active = this.state.activeEventIDs.indexOf( event.id ) > -1
      return <Event ref={ event.id } key={ event.id } active={ active } {...event} />
    })

    return (
      <ul ref='list' className={ this.classList() }>
        { events }
      </ul>
    )
  }
}

export default EventList
