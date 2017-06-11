import React, { PureComponent } from 'react'
import { func } from 'prop-types'
import TextField from 'material-ui/TextField'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import { validate as validFilter } from '../adapters/filter'
import { fromDefaults as getFilterOptions } from '../adapters/filter-options'
import { URL_DATE } from '../lib/date-formats'

const controlStyles = {
  width: '100%',
  textAlign: 'left'
}

class FilterDialog extends PureComponent {

  static propTypes = {
    onChange: func.isRequired,
    selected: validFilter
  };

  queryChange = ( ev ) => {
    this.props.onChange({
      ...this.props.selected,
      query: ev.target.value
    })
  };

  raceTypeChange = ( ev, index ) => {
    const raceType = getFilterOptions().raceTypes[index].val
    this.props.onChange({
      ...this.props.selected,
      raceType
    })
  };

  dateRangeChange = ( ev, index ) => {
    const newVal = getFilterOptions().dateRanges[index].val
    this.props.onChange({
      ...this.props.selected,
      startDate: newVal[0],
      endDate: newVal[1]
    })
  };

  renderMenuItem = ( opt ) => (
    <MenuItem key={ opt.val } value={ opt.val } primaryText={ opt.text } />
  );

  dateRangeID = range => `${range[0].format( URL_DATE )}...${range[1].format( URL_DATE )}`

  selectedDateRange = () => {
    const { selected: { startDate, endDate } } = this.props
    const rangeID = this.dateRangeID([ startDate, endDate ])

    return getFilterOptions().dateRanges.find( dr => this.dateRangeID( dr.val ) === rangeID ) ||
           { text: 'Custom', val: [ startDate, endDate ] }
  }

  renderRaceTypeSelector = () => {
    const items = getFilterOptions().raceTypes.map( this.renderMenuItem )
    return (
      <DropDownMenu
        value={ this.props.selected.raceType }
        onChange={ this.raceTypeChange }
        style={ controlStyles } >
        { items }
      </DropDownMenu>
    )
  };

  renderDateSelector = () => {
    const items = getFilterOptions().dateRanges.map( this.renderMenuItem )
    const range = this.selectedDateRange().val
    return (
      <DropDownMenu
        value={ range }
        onChange={ this.dateRangeChange }
        style={ controlStyles }>
        { items }
      </DropDownMenu>
    )
  };

  renderSearchField = () => {
    return (
      <TextField
        hintText='Search'
        value={ this.props.selected.query }
        onChange={ this.queryChange }
        style={ { width: 'auto', margin: '0 24px', display: 'block' } } />
    )
  };

  render() {
    return (
      <div className='filter'>
        <fieldset>
          { this.renderRaceTypeSelector() }
        </fieldset>
        <fieldset>
          { this.renderDateSelector() }
        </fieldset>
        <fieldset>
          { this.renderSearchField() }
        </fieldset>
      </div>
    )
  }

}

export default FilterDialog
