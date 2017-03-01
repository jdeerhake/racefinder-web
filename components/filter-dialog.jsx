import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'


const controlStyles = {
  width: '100%',
  textAlign: 'left'
}

const { array, func, string } = PropTypes

class FilterDialog extends Component {

  static propTypes = {
    dateRange: array.isRequired,
    dateRangeOptions: array.isRequired,
    onChange: func.isRequired,
    query: string.isRequired,
    type: string.isRequired,
    typeOptions: array.isRequired
  };

  static defaultProps = {
    dateRange: [1,2],
    dateRangeOptions: [{ val: 'Test', text: 'Test' }],
    query: 'foo',
    type: 'bar',
    typeOptions: [{ val: 'Test', text: 'Test' }]
  }

  queryChange = ( ev ) => {
    this.props.onChange({ query: ev.target.value })
  };

  raceTypeChange = ( ev, index ) => {
    this.props.onChange({ type: this.props.typeOptions[index].val })
  };

  dateRangeChange = ( ev, index ) => {
    this.props.onChange({ dateRange: this.props.dateRangeOptions[index].val })
  };

  renderMenuItem = ( opt ) => (
    <MenuItem key={ opt.val } value={ opt.val } primaryText={ opt.text } />
  );

  renderRaceTypeSelector = () => {
    const items = this.props.typeOptions.map( this.renderMenuItem )

    return (
      <DropDownMenu
        value={ this.props.type }
        onChange={ this.raceTypeChange }
        style={ controlStyles } >
        { items }
      </DropDownMenu>
    )
  };

  renderDateSelector = () => {
    const items = this.props.dateRangeOptions.map( this.renderMenuItem )

    return (
      <DropDownMenu
        value={ this.props.dateRange }
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
        value={ this.props.query }
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
