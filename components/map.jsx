import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import MapActions from '../actions/map-actions'
import MarkerStore from '../stores/marker-store'
import HighlightedMarkerStore from '../stores/highlighted-marker-store'
import ActiveMarkerStore from '../stores/active-marker-store'
import Marker from './marker.jsx'
import LocationSearch from './location-search.jsx'
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

const { object, bool, number } = React.PropTypes

class Map extends React.Component {

  static propTypes = {
    center: object,
    disableDefaultUI: bool,
    listWidth: number,
    mapTypeID: number,
    zoom: number,
    zoomControl: bool,
    zoomControlOptions: object
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

  componentWillReceiveProps( nextProps ) {
    if( nextProps.center !== this.props.center ) {
      console.log( 'why?' )
      this.moveMap( nextProps.center, nextProps.zoom )
    }
  }

  createGMap = () => {
    const el = ReactDOM.findDOMNode( this.refs.gmap )
    const gMap = new google.maps.Map( el, this.props )
    MapActions.createMap( gMap )
  };

  onMarkerChange = () => {
    this.setState( getStateFromStores() )
  };

  onMapChange = () => {
    const gMap = MapStore.get( 'gMap' )
    if( gMap !== this.state.gMap ) {
      this.setState({ gMap : MapStore.get( 'gMap' ) })
      this.gMapListeners( gMap )
    }
  };

  gMapListeners = ( gMap ) => {
    addMapEventListener( gMap, 'bounds_changed', this.handleBoundsChanged )
    addMapEventListener( gMap, 'center_changed', this.handleCenterChanged )
    addMapEventListener( gMap, 'zoom_changed', this.handleZoomChanged )
    addMapEventListener( gMap, 'click', this.handleClick )
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

  handleClick = () => {
    MapActions.click()
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

  moveMap = ({ lat, lng }, zoom) => {
    this.state.gMap.panTo( new google.maps.LatLng( lat, lng ) )
    this.state.gMap.setZoom( zoom )
  };

  listCoverageMultiplier = () => {
    let totalWidth = ReactDOM.findDOMNode( this.refs.gmap ).clientWidth
    return this.props.listWidth / totalWidth
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

    return (
      <div id='map'>
        <div ref='gmap' id='gmap'></div>
        <LocationSearch onSearch={ this.moveMap } />
        { markers }
      </div>)
  }

}

export default Map
