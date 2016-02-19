import React from 'react'
import TextField from 'material-ui/lib/text-field'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import MyLocationIcon from 'material-ui/lib/svg-icons/maps/my-location'
import SearchIcon from 'material-ui/lib/svg-icons/action/search'
import MapActions from '../actions/map-actions'
import styles from '../lib/styles'

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

  handleSearchClick = () => {
    if( this.state.searching && this.state.searchValue ) {
      this.createSearch()
    } else if( this.state.searching ) {
      this.setState({ searching: false })
    } else {
      this.setState({ searching: true })
    }
  };

  createSearch = () => {
    MapActions.geocodeLocation( this.state.searchValue )
    this.setState({ searching: false, searchValue: '' })
  }

  setSearchValue = ({ target }) => {
    this.setState({ searchValue: target.value })
  }

  render() {

    return (
      <span className={`location-search ${this.state.searching && 'searching'}`}>
        <TextField hintText='City, State or ZIP Code'
                   className='search'
                   onChange={ this.setSearchValue }
                   onEnterKeyDown={ this.createSearch }
                   style={ this.state.searching ? activeSearchStyle : inactiveSearchStyle }
                   value={ this.state.searchValue } />
        { this.state.searching ||
          <FloatingActionButton mini backgroundColor={ styles.color.active } style={ floatingButtonStyle }>
            <MyLocationIcon />
          </FloatingActionButton>
        }
        <FloatingActionButton mini onMouseDown={ this.handleSearchClick } backgroundColor={ styles.color.accent } style={ floatingButtonStyle }>
          <SearchIcon />
        </FloatingActionButton>
      </span>
    )
  }

}

export default LocationSearch