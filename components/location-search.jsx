import React from 'react'
import TextField from 'material-ui/lib/text-field'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import MyLocationIcon from 'material-ui/lib/svg-icons/maps/my-location'
import SearchIcon from 'material-ui/lib/svg-icons/action/search'
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

class LocationSearch extends React.Component {

  static propTypes = {
    onSearch: React.PropTypes.func.isRequired
  }

  state = {
    searching: false,
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
    navigator.geolocation.getCurrentPosition( position => {
      const { latitude: lat, longitude: lng } = position.coords
      this.props.onSearch({ lat, lng }, 13)
    })
  };

  createSearch = () => {
    this.geocode( this.state.searchValue ).then(( latLng ) => {
      this.props.onSearch( latLng, 13 )
    }, ( error ) => {
      alert( error )
    })
    this.setState({ searching: false, searchValue: '' })
  }

  setSearchValue = ({ target }) => {
    this.setState({ searchValue: target.value })
  }

  render() {
    return (
      <span className={`location-search ${this.state.searching && 'searching'}`}>
        <TextField
          hintText='City, State or ZIP Code'
          className='search'
          onChange={ this.setSearchValue }
          onEnterKeyDown={ this.createSearch }
          style={ this.state.searching ? activeSearchStyle : inactiveSearchStyle }
          value={ this.state.searchValue } />
        <FloatingActionButton mini onMouseDown={ this.handleSearchClick } backgroundColor={ styles.color.accent } style={ floatingButtonStyle }>
          <SearchIcon />
        </FloatingActionButton>
        { this.state.searching ||
          <FloatingActionButton mini
            onMouseDown={ this.handleGeoClick }
            backgroundColor={ styles.color.active }
            style={ floatingButtonStyle }>
            <MyLocationIcon />
          </FloatingActionButton>
        }
      </span>
    )
  }

}

export default LocationSearch