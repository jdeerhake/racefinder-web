import React from 'react'
import EventActions from '../actions/event-actions'
import MarkerIcons from '../lib/marker-styles'

class Marker extends React.Component {

  static propTypes = {
    active: React.PropTypes.bool,
    events: React.PropTypes.arrayOf( React.PropTypes.string ),
    gMap: React.PropTypes.object.isRequired,
    highlighted: React.PropTypes.bool,
    lat: React.PropTypes.string.isRequired,
    lng: React.PropTypes.string.isRequired
  };

  state = {
    gLatLng: false,
    gMarker: false
  };

  componentWillMount() {
    let latLng = new google.maps.LatLng( this.props.lat, this.props.lng )
    let marker = new google.maps.Marker({ position : latLng })
    marker.setMap( this.props.gMap )
    this.gMapListener = google.maps.event.addListener( marker, 'click', this.activateEvents )

    this.setState({
      gLatLng: latLng,
      gMarker: marker
    })
  }

  componentDidMount() {
    this.state.gMarker.setIcon( this.iconForProps() )
  }

  componentWillReceiveProps( nextProps ) {
    let currentIcon = this.iconForProps()
    let newIcon = this.iconForProps( nextProps )
    if( newIcon !== currentIcon ) {
      this.state.gMarker.setIcon( newIcon )
    }
  }

  componentWillUnmount() {
    google.maps.event.removeListener( this.gMapListener )
    this.removeMap()
  }

  iconForProps = ( props ) => {
    props = props || this.props
    if( props.active ) {
      return MarkerIcons.ACTIVE_ICON
    } else if( props.highlighted ) {
      return MarkerIcons.HIGHLIGHTED_ICON
    } else {
      return MarkerIcons.INACTIVE_ICON
    }
  };

  changeMap = ( gMap ) => {
    this.state.gMarker.setMap( gMap )
  };

  removeMap = () => {
    this.state.gMarker.setMap( null )
  };

  activateEvents = () => {
    EventActions.activateEvents( this.props.events )
  };

  render() {
    return <span />
  }

}

export default Marker
