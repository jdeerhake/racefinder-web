import React, { PureComponent } from 'react'
import { func } from 'prop-types'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import PlaceSelector from './place-selector.jsx'
import Snackbar from 'material-ui/Snackbar'
import colors from '../lib/colors'
import { RACE_TYPES } from '../adapters/filter-options'

import '../styles/search-box.scss'

export default class SearchBox extends PureComponent {

  static propTypes = {
    onSearch: func
  }

  state = {
    selectedRaceType: '',
    search: '',
    selectedPlace: false,
    isSearching: false,
    errorMessage: ''
  }

  clearError = () => {
    this.setState({ errorMessage: '' })
  }

  handleRaceTypeChange = ( ev, i, val ) => {
    this.setState({ selectedRaceType: val })
  };

  handlePlaceSelect = ( selectedPlace ) => {
    this.setState({ selectedPlace })
  };

  startSearch = () => {
    if( !this.state.selectedPlace ) {
      return this.setState({ errorMessage: 'Please select a valid location to search' })
    }

    const { selectedPlace: { location }, selectedRaceType } = this.state
    this.props.onSearch({ location, filters: { raceType: selectedRaceType }})
  };

  renderRaceTypes = () => {
    return RACE_TYPES.filter( t => t.val ).map( r => (
      <MenuItem key={ r.val } value={ r.val } primaryText={ r.text } />
    ) )
  };

  render() {
    const { selectedRaceType, errorMessage } = this.state
    const textColor = { color: colors[ 'color-neutral' ] }

    return (
      <form className='search-box' onSubmit={ this.startSearch }>
        <div className='wrapper'>
          <div className='race-selector-wrap'>
            <SelectField
              className='race-type-selector'
              floatingLabelText=''
              hintText='Race Type'
              hintStyle={ { fontStyle: 'italic', ...textColor } }
              value={ selectedRaceType }
              onChange={ this.handleRaceTypeChange }
              labelStyle={ { color: colors[ 'color-neutral' ] } }
              fullWidth >
              { this.renderRaceTypes() }
            </SelectField>
          </div>
          <div className='place-select-wrap'>
            <PlaceSelector
              onSelect={ this.handlePlaceSelect } />
          </div>
        </div>
        <RaisedButton label='Search'
          className='search-button'
          labelColor={ colors[ 'color-neutral' ] }
          backgroundColor={ colors[ 'color-active' ] }
          buttonStyle={ { 'height': '50px' } }
          onClick={ this.startSearch } />
        <Snackbar
          open={ !!errorMessage }
          message={ errorMessage }
          autoHideDuration={ 4000 }
          onRequestClose={ this.clearError } />
      </form>
    )
  }
}
