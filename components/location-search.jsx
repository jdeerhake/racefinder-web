import React from 'react'
import _ from 'lodash'
import TextField from 'material-ui/lib/text-field'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import MyLocationIcon from 'material-ui/lib/svg-icons/maps/my-location'
import SearchIcon from 'material-ui/lib/svg-icons/action/search'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'
import styles from '../lib/styles'
import Promise from 'promise'

import '../styles/location-search.scss'

const inactiveSearchStyle = {
  width: 0
}

const activeSearchStyle = {
  marginLeft: '10px'
}

const floatingButtonStyle = {
  lineHeight: '3px',
  marginLeft: '10px'
}

const progressStyle = {
  lineHeight: '3px',
  marginLeft: '10px',
  position: 'relative',
  left: 0,
  top: '-7px',
  transform: 'none',
  display: 'inline-block',
  boxShadow: '0 3px 10px rgba(0,0,0,0.16), 0 3px 10px rgba(0,0,0,0.23)'
}

class LocationSearch extends React.Component {

  static propTypes = {
    onSearch: React.PropTypes.func.isRequired
  }

  state = {
    searching: false,
    activeRequest: false,
    searchValue: ''
  };

  geocode = ( value ) => {
    const geocoder = new google.maps.Geocoder()
    return new Promise(( resolve, reject ) => {
      geocoder.geocode({
        address: value
      }, ( results, status ) => {
        if( status !== 'OK' ) {
          reject( 'Uncrecognized search term, please try again' )
        } else {
          const { lat, lng } = results[0].geometry.location
          resolve({ lat: lat(), lng: lng() })
        }
      })
    })
  };

  handleSearchClick = () => {
    if( this.state.searching && this.state.searchValue ) {
      this.createSearch()
    } else if( this.state.searching ) {
      this.setState({ searching: false })
    } else {
      this.setState({ searching: true })
    }
  };

  handleGeoClick = () => {
    this.setState({ activeRequest: true })
    navigator.geolocation.getCurrentPosition( position => {
      this.setState({ activeRequest: false })
      const { latitude: lat, longitude: lng } = position.coords
      this.props.onSearch({ lat, lng }, 13)
    })
  };

  createSearch = () => {
    this.setState({ activeRequest: true })
    this.geocode( this.state.searchValue ).then(( latLng ) => {
      this.props.onSearch( latLng, 13 )
      this.setState({ searching: false, searchValue: '', activeRequest: false })
    }, ( error ) => {
      alert( error )
    })
  };

  setSearchValue = ({ target }) => {
    this.setState({ searchValue: target.value })
  };

  renderSearchField = () => {
    return (
      <TextField
          hintText='City, State or ZIP Code'
          className='search'
          onChange={ this.setSearchValue }
          onEnterKeyDown={ this.createSearch }
          style={ this.state.searching ? activeSearchStyle : inactiveSearchStyle }
          value={ this.state.searchValue } />
    )
  };

  renderSearchButton = () => {
    const color = styles.color.accent
    if( this.state.searching && this.state.activeRequest ) {
      return (
        <RefreshIndicator
          size={40}
          left={0}
          top={0}
          loadingColor={ '#FFF' }
          status='loading'
          style={ _.assign({ backgroundColor: color }, progressStyle ) } />
      )
    } else {
      return (
        <FloatingActionButton mini
          onMouseDown={ this.handleSearchClick }
          backgroundColor={ color }
          style={ floatingButtonStyle }>
          <SearchIcon />
        </FloatingActionButton>
      )
    }
  };

  renderGeoButton = () => {
    const color = styles.color.active
    if( this.state.searching ) {
      return
    } else if( this.state.activeRequest ) {
      return (
        <RefreshIndicator
          size={40}
          left={0}
          top={0}
          loadingColor={ '#FFF' }
          status='loading'
          style={ _.assign({ backgroundColor: color }, progressStyle ) } />
      )
    } else {
      return (
        <FloatingActionButton mini
          onMouseDown={ this.handleGeoClick }
          backgroundColor={ color }
          style={ floatingButtonStyle }>
          <MyLocationIcon />
        </FloatingActionButton>
      )
    }
  };

  render() {
    return (
      <span className={`location-search ${this.state.searching && 'searching'}`}>
        {this.renderSearchField()}
        {this.renderSearchButton()}
        {this.renderGeoButton()}
      </span>
    )
  }

}

export default LocationSearch