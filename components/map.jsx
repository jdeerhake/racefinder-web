import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import MapActions from '../actions/map-actions'
import MarkerStore from '../stores/marker-store'
import HighlightedMarkerStore from '../stores/highlighted-marker-store'
import ActiveMarkerStore from '../stores/active-marker-store'
import Marker from './marker.jsx'
import MapStore from '../stores/map-store'

import '../styles/map.scss'

let addMapEventListener = google.maps.event.addListener

function getStateFromStores() {
  return {
    markers: MarkerStore.getAll(),
    active: ActiveMarkerStore.getActive(),
    highlighted: HighlightedMarkerStore.getHighlighted()
  }
}

class Map extends React.Component {

  static propTypes = {
    disableDefaultUI: React.PropTypes.bool,
    listWidth: React.PropTypes.number,
    mapTypeID: React.PropTypes.number,
    zoom: React.PropTypes.number,
    zoomControl: React.PropTypes.bool,
    zoomControlOptions: React.PropTypes.object
  };

  static defaultProps = {
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.TOP_LEFT
    }
  };

  state = getStateFromStores();

  componentDidMount() {
    [ MarkerStore, HighlightedMarkerStore, ActiveMarkerStore ]
      .forEach( store => store.addChangeListener( this.onMarkerChange ) )
    MapStore.addChangeListener( this.onMapChange )
    this.createGMap()
  }

  createGMap = () => {
    let el = ReactDOM.findDOMNode( this )
    let gMap = new google.maps.Map( el, this.props )
    MapActions.createMap( gMap )
  };

  onMarkerChange = () => {
    this.setState( getStateFromStores() )
  };

  onMapChange = () => {
    let gMap = MapStore.get( 'gMap' )
    if( gMap === this.state.gMap ) { return false }
    this.setState({ gMap : MapStore.get( 'gMap' ) })
    this.gMapListeners( gMap )
  };

  gMapListeners = ( gMap ) => {
    addMapEventListener( gMap, 'bounds_changed', this.handleBoundsChanged )
    addMapEventListener( gMap, 'center_changed', this.handleCenterChanged )
    addMapEventListener( gMap, 'zoom_changed', this.handleZoomChanged )
  };

  handleBoundsChanged = _.debounce(() => {
    MapActions.changeBounds( this.getBounds() )
  }, 500 );

  handleCenterChanged = () => {
    MapActions.changeCenter( this.getCenter() )
  };

  handleZoomChanged = () => {
    MapActions.changeZoom( this.state.gMap.getZoom() )
  };

  getBounds = () => {
    let bounds = this.state.gMap.getBounds()
    let ne = bounds.getNorthEast()
    let sw = bounds.getSouthWest()
    let lngSpan = ne.lng() - sw.lng()

    return {
      n: ne.lat(),
      s: sw.lat(),
      e: ne.lng() - ( lngSpan * this.listCoverageMultiplier() ),
      w: sw.lng()
    }
  };

  getCenter = () => {
    let pt = this.state.gMap.getCenter()
    return { lat: pt.lat(), lng: pt.lng() }
  };

  listCoverageMultiplier = () => {
    let totalWidth = ReactDOM.findDOMNode( this.refs.map ).clientWidth
    if( this.props.listWidth === totalWidth ) {
      return 0
    } else {
      return this.props.listWidth / totalWidth
    }
  };

  render() {
    let gMap = this.state.gMap
    let markers = _.values( this.state.markers ).map( marker => {
      return (<Marker
                key={marker.id}
                gMap={gMap}
                active={ _.includes( this.state.active, marker.id ) }
                highlighted={ _.includes( this.state.highlighted, marker.id ) }
                {...marker} />)
    })

    return (<div ref='map' id='map'>{ markers }</div>)
  }

}

export default Map
