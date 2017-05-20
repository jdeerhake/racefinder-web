import React, { PureComponent, PropTypes } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import PlaceSelector from './place-selector.jsx'
import Snackbar from 'material-ui/Snackbar'
import { validate as validFilterPreset } from '../adapters/filter-preset'
import colors from '../lib/colors'

import '../styles/search-box.scss'

const { arrayOf, func } = PropTypes

export default class SearchBox extends PureComponent {

  static propTypes = {
    filterPresets: arrayOf( validFilterPreset ),
    onSearch: func
  }

  constructor( props ) {
    super( props )
    this.state = {
      ...this.state,
      selectedFilterPreset: props.filterPresets[0]
    }
  }

  state = {
    selectedFilterPreset: false,
    search: '',
    selectedPlace: false,
    isSearching: false,
    errorMessage: ''
  }

  clearError = () => {
    this.setState({ errorMessage: '' })
  }

  handleFilterPresetChange = ( ev, i, val ) => {
    this.setState({ selectedFilterPreset: val })
  };

  handlePlaceSelect = ( selectedPlace ) => {
    this.setState({ selectedPlace})
  };

  startSearch = () => {
    if( !this.state.selectedPlace ) {
      return this.setState({ errorMessage: 'Please select a valid location to search' })
    }

    const { selectedPlace: { location }, selectedFilterPreset: { filters } } = this.state
    this.props.onSearch({ location, filters })
  };

  renderFilterPresets = () => {
    return this.props.filterPresets.map(fp => (
      <MenuItem key={ fp.id } value={ fp } primaryText={ fp.name } />
    ) )
  };

  render() {
    const { selectedFilterPreset, errorMessage } = this.state

    return (
      <form className='search-box' onSubmit={ this.startSearch }>
        <div className='wrapper'>
          <div className='race-selector-wrap'>
            <SelectField
              className='race-type-selector'
              floatingLabelText=''
              value={ selectedFilterPreset }
              onChange={ this.handleFilterPresetChange }
              labelStyle={ { color: colors[ 'color-neutral' ] } }
              fullWidth >
              { this.renderFilterPresets() }
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
