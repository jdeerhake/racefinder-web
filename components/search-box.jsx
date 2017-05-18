import React, { PureComponent, PropTypes } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import PlaceSelector from './place-selector.jsx'
import { validate as validFilterPreset } from '../adapters/filter-preset'
import colors from '../lib/colors'

import '../styles/search-box.scss'

const { arrayOf, func, string } = PropTypes

export default class SearchBox extends PureComponent {

  static propTypes = {
    filterPresets: arrayOf( validFilterPreset )
  }

  constructor( props ) {
    super( props )
    this.state.selectedFilterPreset = props.filterPresets[0]
  }

  state = {
    selectedFilterPreset: false,
    search: '',
    selectedPlace: false,
    isSearching: false
  }

  handleFilterPresetChange = ( ev, i, val ) => {
    this.setState({ selectedFilterPreset: val })
  };

  updateSearch = ({ target: { value }}) => {
    this.setState({
      search: value,
      isSearching: true
    })
  };

  handlePlaceSelect = ( place ) => {
    this.setState({
      search: `${ place.name }, ${ place.stateAbbr }`,
      selectedPlace: place,
      isSearching: false
    })
  };

  startSearch = () => {
    console.log('click')
  };

  renderFilterPresets = () => {
    return this.props.filterPresets.map(fp => (
      <MenuItem key={ fp.id } value={ fp } primaryText={ fp.name } />
    ) )
  };

  render() {
    const { search, selectedFilterPreset, isSearching } = this.state

    return (
      <form className='search-box' onSubmit={ this.startSearch }>
        <SelectField
          className='race-type-selector'
          floatingLabelText=''
          value={ selectedFilterPreset }
          onChange={ this.handleFilterPresetChange }
          labelStyle={ { color: colors[ 'color-neutral' ] } }
          fullWidth >
          { this.renderFilterPresets() }
        </SelectField>
        <PlaceSelector
          search={ search }
          listOpen={ isSearching }
          onSearchChange={ this.updateSearch }
          onSelect={ this.handlePlaceSelect } />
        <RaisedButton label='Search'
          className='search-button'
          labelColor={ colors[ 'color-neutral' ] }
          backgroundColor={ colors[ 'color-active' ] }
          buttonStyle={ { 'height': '50px' } }
          onClick={ this.startSearch } />
      </form>
    )
  }
}
